const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Carrega GOOGLE_API_KEY do arquivo .env local sem precisar de pacotes externos
function loadApiKey() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return process.env.GOOGLE_API_KEY || '';
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('GOOGLE_API_KEY=')) {
      return trimmed.slice('GOOGLE_API_KEY='.length).trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return process.env.GOOGLE_API_KEY || '';
}

const API_KEY = loadApiKey();

// Lista de modelos por ordem de prioridade (prioriza modelos com 500 RPD / 15 RPM)
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash'
];

const SYSTEM_INSTRUCTION = `Você é o assistente jurídico e de saúde pública da plataforma Rede Acolhe SP (Rede Sampa Trans - SUS São Paulo).
Sua missão é responder à dúvida da pessoa usuária traduzindo portarias do SUS, leis e direitos LGBTQIAPN+ em linguagem acolhedora, clara, direta e sem juridiquês (Trauma-Informed).

REGRAS OBRIGATÓRIAS:
1. Responda SEMPRE estritamente em JSON válido seguindo o schema:
{
  "titulo": "Título direto e acolhedor respondendo especificamente à pergunta",
  "tempo_leitura": "1 min de leitura",
  "categoria": "Uma entre: 'Nome Social', 'Retificação Civil', 'Saúde SUS', 'Segurança & B.O.', 'Trabalho & Renda'",
  "resumo_executivo": "Explicação direta e empática em 2 frases respondendo exatamente o que foi perguntado.",
  "pontos_chave": [
    "Ponto prático 1 específico sobre a pergunta",
    "Ponto prático 2 específico sobre a pergunta",
    "Ponto prático 3 específico sobre a pergunta"
  ],
  "base_legal": "Portaria, Lei ou Provimento aplicável (ex: Portaria MS 2.803, Provimento 73 CNJ, Decreto 58.228 SP, Lei 7.716/89 / ADO 26 STF)",
  "acao_recomendada": "Próximo passo concreto e prático em São Paulo (ex: ir à UBS de referência, RCPN, DECRADI ou CR POP TT)."
}
2. Nunca prescreva doses de medicamentos ao paciente; oriente o acolhimento na UBS (Porta Aberta) e encaminhamento via SIGA Saúde para os ambulatórios especializados (como CR POP TT Janaina Lima, Casa Ser, CRT Santa Cruz).
3. Reforce sempre que o Nome Social é direito garantido sem exigir retificação civil prévia.`;

async function callGemini(pergunta) {
  if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY não encontrada em IA/.env');
  }

  let lastError = null;

  for (const modelId of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: `Pergunta da pessoa usuária em São Paulo: "${pergunta}"` }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        lastError = new Error(data.error?.message || `HTTP ${response.status} em ${modelId}`);
        continue;
      }

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        lastError = new Error(`Resposta vazia do modelo ${modelId}`);
        continue;
      }

      const parsed = JSON.parse(rawText);
      parsed.modelo_utilizado = modelId;
      return parsed;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Nenhum modelo Gemini respondeu.');
}

// Modo de teste via terminal: node IA/ai-server.js --test
if (process.argv.includes('--test')) {
  const testQuery = process.argv[3] || 'Me recusaram o nome social na recepção da UBS, o que eu faço?';
  console.log(`[Teste IA] Pergunta: "${testQuery}"`);
  callGemini(testQuery)
    .then(res => {
      console.log('[Sucesso! Resposta Real do Gemini]:\n', JSON.stringify(res, null, 2));
    })
    .catch(err => {
      console.error('[Erro no Teste IA]:', err.message);
      process.exitCode = 1;
    });
} else {
  const PORT = 8000;
  const previewPath = path.join(__dirname, '..', 'Front-end', 'preview.html');

  const server = http.createServer(async (req, res) => {
    // CORS headers para permitir uso tanto via file:// quanto http://localhost:8000
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    if (req.method === 'GET' && (req.url === '/' || req.url === '/preview.html')) {
      if (fs.existsSync(previewPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fs.readFileSync(previewPath, 'utf8'));
      }
    }

    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ status: 'online', hasApiKey: Boolean(API_KEY) }));
    }

    if (req.method === 'POST' && req.url === '/api/ai/direitos') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const { pergunta } = JSON.parse(body || '{}');
          if (!pergunta || !pergunta.trim()) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({ error: 'Digite uma pergunta.' }));
          }
          console.log(`[IA Request] "${pergunta}"`);
          const result = await callGemini(pergunta.trim());
          console.log(`[IA Success] Respondido via ${result.modelo_utilizado}`);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify(result));
        } catch (err) {
          console.error('[IA Error]:', err.message);
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  });

  server.listen(PORT, () => {
    console.log('====================================================');
    console.log('🚀 SERVIDOR IA + PREVIEW REDE ACOLHE SP ATIVO!');
    console.log(`👉 Abra no navegador: http://localhost:${PORT}`);
    console.log(`🤖 Endpoint Gemini:   http://localhost:${PORT}/api/ai/direitos`);
    console.log('====================================================');
  });
}
