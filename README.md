# Projeto POC de Mapas

Este projeto é uma POC (Proof of Concept) que demonstra o uso de dois tipos diferentes de mapas em uma aplicação web: Google Maps e Leaflet.

## Pré-requisitos

Testado com Node.js na versão `v18.16.0`

## Instalação

Clone este repositório no seu local de preferência.

```bash
git clone https://github.com/piique/poc-maps-frontend-reactjs.git
cd poc-maps-frontend-reactjs
```

Na raiz do projeto, crie um arquivo `.env` e coloque o seguinte conteudo dentro dele: 

```.env
REACT_APP_GOOGLE_MAPS_API_KEY=INSIRA_SUA_API_KEY_AQUI
```

Substitua `INSIRA_SUA_API_KEY_AQUI` pela chave de API do Google Maps.


Para instalar as dependências necessárias e rodar o projeto, execute o seguinte comando:

```bash
npm install --legacy-peer-deps
npm run start
```

Abra o navegador no endereço [http://localhost:3000](http://localhost:3000)
