import os
import sys
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Permite executar `python IA/server.py` tanto da raiz quanto de dentro de `IA/`
CURRENT_DIR = str(Path(__file__).resolve().parent)
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from agent import consultar_direitos, ResumoDireitoSUS

app = FastAPI(
    title="Rede Acolhe SP • API de Inteligência Artificial",
    description="Endpoint de síntese de direitos, portarias do SUS e acolhimento com Agno + Gemini 3.5 Flash-Lite",
    version="1.0.0"
)

# Habilita CORS para permitir chamadas diretas do preview.html e do Expo/React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PerguntaRequest(BaseModel):
    pergunta: str

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "Rede Acolhe SP AI Service",
        "model": "gemini-3.5-flash-lite",
        "framework": "Agno"
    }

@app.post("/api/ai/direitos", response_model=ResumoDireitoSUS)
def post_consultar_direitos(payload: PerguntaRequest):
    """
    Recebe a dúvida do cidadão ou profissional e retorna a síntese estruturada
    utilizando o agente Gemini 3.5 Flash-Lite com fallback resiliente.
    """
    resultado = consultar_direitos(payload.pergunta)
    return resultado

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"[Rede Acolhe SP] Iniciando servidor de IA na porta {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
