import os
from typing import List
from pydantic import BaseModel, Field
from dotenv import load_dotenv, find_dotenv

from agno.agent import Agent
from agno.models.google import Gemini

# 1. Carrega variáveis de ambiente (.env com GOOGLE_API_KEY)
load_dotenv(find_dotenv())

# 2. Schema Estruturado: Garante que a IA responda exatamente no formato da Tela 4
class ResumoDireitoSUS(BaseModel):
    titulo: str = Field(description="Título direto e acolhedor sobre o direito ou portaria.")
    tempo_leitura: str = Field(description="Estimativa rápida, ex: '2 min de leitura'.")
    categoria: str = Field(description="Uma entre: 'Nome Social', 'Retificação Civil', 'Saúde SUS', 'Segurança & B.O.'.")
    resumo_executivo: str = Field(description="Explicação desmistificada em 2 ou 3 frases, sem juridiquês.")
    pontos_chave: List[str] = Field(description="Lista de 3 garantias práticas imediatas do cidadão.")
    base_legal: str = Field(description="Portaria, Lei ou Decreto de referência (ex: Portaria MS nº 2.803).")
    acao_recomendada: str = Field(description="O que a pessoa deve fazer na prática (ex: 'Procure sua UBS de referência').")

# 3. Configuração do Modelo com a maior cota da conta (500 RPD / 15 RPM)
model = Gemini(
    id="gemini-3.5-flash-lite",
)

# 4. Agente Especializado em Direitos & Acolhimento
acolhe_agent = Agent(
    model=model,
    description="Agente de Navegação em Direitos e Acolhimento em Saúde para a População LGBTQIAPN+ de São Paulo.",
    instructions=[
        "Você é o assistente de inteligência artificial da plataforma Rede Acolhe SP.",
        "Seu papel é traduzir termos jurídicos, portarias do SUS e resoluções cartorárias em linguagem acolhedora, clara e acessível.",
        "Regras Inegociáveis:",
        "1. Nunca faça diagnósticos médicos e nunca prescreva remédios ou dosagens hormonais.",
        "2. Deixe explícito que o Processo Transexualizador no SUS exige triagem prévia na UBS de bairro (Porta Aberta) antes do ambulatório especializado.",
        "3. Lembre sempre que o uso do Nome Social é garantido por lei em todos os serviços públicos sem necessidade de documento retificado.",
        "4. Em situações de violência ou risco recente, indique o acolhimento imediato na DECRADI ou acolhimento em saúde para profilaxia PEP em até 72 horas.",
        "5. Mantenha tom empático, sóbrio, respeitoso e direto ao ponto (Trauma-Informed)."
    ],
    output_schema=ResumoDireitoSUS,
    markdown=False
)

# Fallback local de contingência (Red Team / Falhas de rede ou cota)
FALLBACK_RESUMO_SUS = ResumoDireitoSUS(
    titulo="Resumo com IA: Direitos na Rede SUS 2026",
    tempo_leitura="2 min de leitura",
    categoria="Saúde SUS",
    resumo_executivo="Garantia de acolhimento integral, respeito à identidade de gênero e acesso desburocratizado a serviços de saúde pelo SUS em São Paulo.",
    pontos_chave=[
        "O uso do Nome Social é garantido por lei em qualquer unidade da rede municipal e estadual, sem exigência de documento retificado prévio.",
        "A Profilaxia Pós-Exposição (PEP) é gratuita e deve ser iniciada prioritariamente nas primeiras 2h até no máximo 72h após exposição.",
        "Centros Especializados municipais (ex: Janaina Lima) oferecem equipe multiprofissional contínua para o processo transexualizador."
    ],
    base_legal="Portaria MS nº 2.803 revisada • Protocolo Sampa Trans",
    acao_recomendada="Procure a UBS mais próxima ou Centro de Referência Janaina Lima."
)

def consultar_direitos(pergunta: str) -> ResumoDireitoSUS:
    """Consulta o agente com fallback automático para contingência em caso de erro de rede/cota."""
    try:
        response = acolhe_agent.run(pergunta)
        if response and response.content and isinstance(response.content, ResumoDireitoSUS):
            return response.content
        return FALLBACK_RESUMO_SUS
    except Exception as e:
        print(f"[Aviso] Falha ao consultar agente Gemini ({e}). Acionando fallback local.")
        return FALLBACK_RESUMO_SUS

# 5. Exemplo de Execução
if __name__ == "__main__":
    pergunta = "Como funciona a retificação de nome no cartório e o início do hormônio pelo SUS em SP?"
    
    print("\nProcessando com Gemini 3.5 Flash-Lite...\n")
    response = acolhe_agent.run(pergunta)
    
    # A resposta já vem como objeto tipado pronto para virar API/JSON
    print("=== DADOS RETORNADOS PARA O FRONT-END ===")
    if response and response.content:
        # Se for instância do modelo Pydantic
        if isinstance(response.content, ResumoDireitoSUS):
            print(f"Título: {response.content.titulo}")
            print(f"Categoria: {response.content.categoria}")
            print(f"Resumo: {response.content.resumo_executivo}")
            print("Pontos Chave:")
            for ponto in response.content.pontos_chave:
                print(f" - {ponto}")
            print(f"Base Legal: {response.content.base_legal}")
            print(f"Ação: {response.content.acao_recomendada}")
        else:
            print(response.content)
