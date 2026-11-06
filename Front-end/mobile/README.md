# 🏥 UBS Finder — Rede & Mapa de Saúde Integral

Aplicativo mobile construído com **React Native + Expo Go** para localização, filtragem e acolhimento em Unidades Básicas de Saúde (UBS) e serviços de saúde especializada (Rede Sampa Trans, CR POP TT, Profilaxia PrEP/PEP, acolhimento e garantia do nome social).

---

## 📱 Funcionalidades da Tela Principal

1. **Barra de Pesquisa com Modo Disfarçar (`SearchBar`)**:
   - Campo para busca por nome da UBS, serviço (ex: PrEP, hormonização), bairro ou endereço.
   - Botão **Disfarçar** com ícone de escudo que transforma instantaneamente o aplicativo em uma calculadora discreta funcional (feature de privacidade para populações vulneráveis).
2. **Carrossel de Filtros Rápidos (`FilterTabs`)**:
   - `Todos os Serviços`, `Saúde SUS (Sampa Trans)`, `Acolhimento & Escuta`, `Testagem Rápida`, `PrEP / PEP`.
3. **Mapa Interativo (`MapContainer`)**:
   - Marcadores temáticos para cada serviço (cruz azul médica para UBS República, maleta especializada para CR POP TT).
   - Marcador animado pulsante **"Você está aqui"**.
   - Botão flutuante para centralizar a câmera na sua localização.
   - Toque em qualquer marcador para focar e abrir as informações completas no painel inferior.
4. **Painel Deslizável de Informações (`UBSBottomSheet`)**:
   - 3 níveis de expansão deslizáveis suavemente.
   - Resumo das unidades verificadas e badge territorial (`CRS Centro`).
   - Cards completos com status (`Porta Aberta` vs `Exige Encaminhamento`), endereço, distância, horário, tags e alertas de Linha de Cuidado.
   - Ações diretas: **Ligar**, **Como Chegar** (abre rota no Google Maps), **Ver Fluxo** e **Ver no Mapa**.
5. **Navegação Inferior em Abas (`BottomTabNavigator`)**:
   - **Rede & Mapa** (tela principal)
   - **Direitos & IA** (guia com assistente virtual de direitos no SUS)
   - **Capacitação** (trilhas formativas para profissionais e comunidade)

---

## 🚀 Como Executar no Expo Go

1. Abra o terminal na pasta do projeto:
   ```bash
   cd "C:\Users\guilh\OneDrive\Desktop\hackthon"
   ```

2. Inicie o servidor Expo:
   ```bash
   npx expo start
   ```

3. **No seu celular (Android ou iOS)**:
   - Instale o app **Expo Go** pela Google Play Store ou Apple App Store.
   - Abra o Expo Go e escaneie o **QR Code** exibido no terminal.
   - O app será carregado instantaneamente no seu aparelho!
