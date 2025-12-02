# GameVault (Angular Standalone)

Progetto dimostrativo con:
- Standalone Components
- Routing
- Services + HttpClient
- Reactive Forms
- json-server per Mock API

# LINK ALLA PRESENTAZIONE PROGETTO!!

https://www.canva.com/design/DAG6WP29EA8/JibDc7kWzuAl9juGgpqsNQ/edit?utm_content=DAG6WP29EA8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Requisiti
- Node.js >= 18
- Angular CLI >= 18
- json-server (devDependency)

## Setup
1. npm install
2. Avvio mock API:
   - npm run json-server
   - API: http://localhost:3000/games
3. Avvio app:
   - npm start
   - App: http://localhost:4200

## Struttura funzionale
- Home: lista giochi con link al dettaglio
- Dettaglio: tips e salvataggi del gioco selezionato
- Aggiungi: form reattivo per creare gioco con tips e salvataggi

## Comandi utili json-server
- GET /games
- GET /games/1
- POST /games
- PATCH /games/1
- DELETE /games/1