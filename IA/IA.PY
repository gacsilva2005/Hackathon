from agent import (
    acolhe_agent,
    model,
    ResumoDireitoSUS,
    FALLBACK_RESUMO_SUS,
    consultar_direitos,
)

if __name__ == "__main__":
    pergunta = "Como funciona a retificação de nome no cartório e o início do hormônio pelo SUS em SP?"
    print("\n[IA.PY] Executando com Gemini 3.5 Flash-Lite...\n")
    resumo = consultar_direitos(pergunta)
    print("=== DADOS RETORNADOS PARA O FRONT-END ===")
    print(f"Título: {resumo.titulo}")
    print(f"Categoria: {resumo.categoria}")
    print(f"Resumo: {resumo.resumo_executivo}")
    print("Pontos Chave:")
    for ponto in resumo.pontos_chave:
        print(f" - {ponto}")
    print(f"Base Legal: {resumo.base_legal}")
    print(f"Ação: {resumo.acao_recomendada}")
