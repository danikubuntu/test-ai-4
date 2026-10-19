# Atelier Forma — portfolio dimostrativo

Portfolio italiano responsive, con quattro progetti e immagini SVG fittizie locali.

## Avvio
- Requisito locale: Node.js 22.
- `npm ci` (non sono presenti dipendenze di terze parti).
- `npm start` avvia il server HTTP su `0.0.0.0:3000`.
- `PORT=4000 npm start` modifica la porta locale; su AutoDeploy usare la porta 3000 configurata in `paas.yml`.
- `npm test` esegue test del progetto, se presenti.

## Deployment AutoDeploy
- Builder `dockerfile`, contesto `.` e Dockerfile nella radice.
- Unico servizio pubblico HTTP su porta interna 3000, HTTPS terminato dalla piattaforma.
- Nessun database, servizio privato, mount persistente, migrazione, hook o servizio esterno runtime.
- `GET /healthz` restituisce HTTP 200 (`ok`).
- Nessuna variabile obbligatoria o segreta. `PORT` è opzionale in esecuzione locale (valore predefinito 3000). `NODE_ENV=production` è impostata nell'immagine.
- Nessun account amministrativo, login o area riservata.
- Il sito non memorizza dati: aggiornamenti blue/green non hanno migrazioni né stato applicativo.

## Personalizzazione
- Testi e link: `public/index.html`.
- Stili: `public/styles.css`.
- Immagini dimostrative: `public/assets/*.svg`.
- Il link email `ciao@example.com` è **deliberatamente dimostrativo e non riceve messaggi**. Sostituirlo con un indirizzo reale se si vuole attivare il contatto prima di pubblicizzare il sito.

## Verifiche
Vedere `VERIFICHE.md` per le verifiche locali effettuate e per quelle che necessitano dell'ambiente AutoDeploy.
