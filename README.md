# Rede Acolhe SP • Rede Sampa Trans

Plataforma de acolhimento e navegação em saúde integral para a população LGBTQIAPN+ de São Paulo — conectando unidades de **Porta Aberta (UBS)**, **Ambulatórios Especializados (CR POP TT / Casa Ser)**, **Fluxo de Atendimento no SUS**, **Assistente Jurídico e de Direitos com IA (Gemini)** e **Modo Disfarçar (Calculadora funcional)** para proteção de privacidade.

---

## Como testar em 1 minuto (Demo Web + IA ao vivo)

Pré-requisito único: **Node.js 18+** (zero `npm install` necessário para subir o servidor e o protótipo unificado).

```bash
# 1. Clone o repositório e acesse a pasta
git clone https://github.com/gacsilva2005/Hackathon.git
cd Hackathon

# 2. (Opcional) Configure sua chave gratuita do Google AI Studio para respostas ao vivo do Gemini
# Sem a chave, o app continua funcionando normalmente com o motor local de contingência (6 tópicos SUS)
cp IA/.env.example IA/.env
# Edite IA/.env e preencha GOOGLE_API_KEY=...

# 3. Suba a aplicação + API de IA
npm start
# (ou: node IA/ai-server.js)
```

Acesse no navegador: **http://localhost:8000**

Para testar apenas a integração Gemini via terminal:
```bash
npm run test:ia
```

---

## Funcionalidades implementadas no Protótipo Unificado ([Front-end/preview.html](Front-end/preview.html))

* **Mapa Interativo (OpenStreetMap + Leaflet)**: visualização das 4 unidades homologadas (`UBS República`, `CR POP TT Janaina Lima`, `AMAE Santa Cecília` e `Casa Ser Cidade Tiradentes`), filtros por categoria (`Todos`, `Porta Aberta`, `Hormonização`) e popups interativos.
* **Busca Híbrida de Endereços (Local + Nominatim)**: busca instantânea nas unidades da rede + autocomplete real de ruas e bairros de São Paulo via OpenStreetMap Nominatim.
* **Tela de Busca & Filtros por CRS**: pesquisa textual em tempo real e chips de filtro (`Todas`, `CRS Centro`, `CRS Leste`, `Porta Aberta`, `Hormonização`).
* **Fluxo SUS & Detalhes da Unidade**: passo a passo específico por unidade (Porta Aberta vs. Encaminhamento SIGA Saúde), telefone, rota no Google Maps e avaliações verificadas.
* **Direitos & IA (`POST /api/ai/direitos`)**: tradução de portarias do SUS, retificação civil em cartório, PEP 72h / PrEP, hormonização e denúncia na DECRADI com **`gemini-3.5-flash-lite`** via [IA/ai-server.js](IA/ai-server.js) e fallback local resiliente.
* **Modo Disfarçar (Privacidade)**: botão **Ocultar** acessível em todas as telas que transforma a interface instantaneamente em uma calculadora funcional.
* **Perfis Cidadão & Profissional SUS**: navegação anônima por padrão, fluxo simulado de login (`Cartão SUS / Gov.br`) e Portal Clínico (`CRM / COREN / CRP`) com protocolos de manejo e capacitação.

---

## Arquitetura do Repositório

| Módulo | Tecnologia | Estado | Descrição |
| :--- | :--- | :--- | :--- |
| **Protótipo Web + Servidor IA** | HTML + Tailwind + Leaflet + Node.js | **Pronto e testado** | [Front-end/preview.html](Front-end/preview.html) servido por [IA/ai-server.js](IA/ai-server.js) na porta `8000` (ou `PORT`). |
| **Agente IA (Python)** | Agno + FastAPI + Pydantic + Gemini | **Pronto** | [IA/agent.py](IA/agent.py) e [IA/server.py](IA/server.py) (`pip install -r IA/requirements.txt`). |
| **Apps Mobile** | React Native + Expo (`~52.0`) | **Protótipo UI** | Estruturas mobile em [Front-end/](Front-end/) e [Front-end/mobile/](Front-end/mobile/) (`npm install && npx expo start`). |
| **Back-end Corporativo** | Java 21 + Spring Boot 4 + SQL Server | **Esqueleto / Infra** | Estrutura inicial Maven em [Back-end/](Back-end/) com [docker-compose.yml](docker-compose.yml) e [Dockerfile](Dockerfile). |

---

## Deploy Rápido na Nuvem (Para compartilhar link ao vivo)

O servidor [IA/ai-server.js](IA/ai-server.js) já lê `process.env.PORT` e atende tanto o front-end (`/`) quanto a API (`/api/ai/direitos`) no mesmo domínio:

* **Build Command**: *(não precisa — zero dependências externas no Node)*
* **Start Command**: `npm start` (ou `node IA/ai-server.js`)
* **Variável de Ambiente**: `GOOGLE_API_KEY` *(opcional — sem ela o app usa automaticamente o fallback local inteligente)*

---

## Equipe

Desenvolvido durante o Hackathon por:
* **Gabriel Conceição Silva** (`@gacsilva2005`)
* **Isaac Felipe** (`@IsaacFelipe`)
* **Millena Araujo** (`@Millena1307`)
* **Sergio Oliveira** (`@Sh0liveira`)
