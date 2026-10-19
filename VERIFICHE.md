# Verifiche effettuate (19 ottobre 2026)

- Manifest YAML: parsing riuscito, `api_version: 1`, chiavi previste e timeout health check maggiore dell’intervallo. Lo schema JSON ufficiale non era disponibile: validazione contro schema **non eseguita**.
- Lock file npm presente; nessuna dipendenza npm esterna.
- Avvio server Node locale: riuscito, bind `0.0.0.0:3000`.
- `GET /`: HTTP 200.
- `GET /healthz`: HTTP 200 e corpo `ok`.
- `GET /styles.css`: HTTP 200.
- `GET /assets/noma.svg`: HTTP 200; gli altri asset SVG sono presenti nel progetto.
- `GET /missing`: HTTP 404 atteso.
- Nessun account, database, stato persistente, hook, migrazioni o variabile segreta necessari.

## Da verificare sull’infrastruttura reale

- Build Docker, deploy AutoDeploy, dominio HTTPS, salute pubblica e aggiornamento blue/green: non eseguiti in questa sessione.
- Verifica visiva multi-browser e navigazione mobile: non eseguite con browser automatico.
