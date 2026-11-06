# Preview HTML — UBS Finder

## Como rodar o preview no browser

### Opção 1 — Abrir direto (pode ter CORS em alguns browsers)
```
Front-end/mobile/preview.html
```
Clique duas vezes no arquivo para abrir no browser.

### Opção 2 — Servidor local Python (recomendado, sem problemas de CORS)
```bash
cd Front-end/mobile
python -m http.server 8080
```
Acesse: **http://localhost:8080/preview.html**

### Opção 3 — Live Server (VS Code)
Instale a extensão **Live Server** e clique em "Go Live" com o `preview.html` aberto.

---

## Funcionalidades do Preview

| Feature | Implementado |
|---|---|
| Mapa OpenStreetMap (CartoCDN) | ✅ |
| Marcadores UBS customizados | ✅ |
| Marcador "Você está aqui" com pulso | ✅ |
| Busca com autocomplete Nominatim | ✅ |
| Fly-to ao selecionar resultado | ✅ |
| Filtros por categoria | ✅ |
| Cards de todas as 4 UBS | ✅ |
| Bottom sheet expansível | ✅ |
| Botão de localização flutuante | ✅ |
| Modo Calculadora (Disfarçar) | ✅ |
| "Como Chegar" (Google Maps) | ✅ |

---

## Expo (mobile / web)
```bash
cd Front-end/mobile
npm install
npx expo start
```
- **`w`** → abre no browser (web)
- **`a`** → abre no Android emulator
- **`i`** → abre no iOS simulator
- **Scan QR** → abre no Expo Go (celular físico)
