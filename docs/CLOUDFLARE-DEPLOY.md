# Pubblicazione Cloudflare collegata a GitHub

Questa procedura pubblica il progetto completo su un URL `workers.dev`, senza
perdere Worker, D1, area gestionale o conferma automatica. GitHub resta il
sorgente principale e ogni push su `main` genera una nuova pubblicazione.

## 1. Crea il database D1

1. Accedi a [Cloudflare](https://dash.cloudflare.com/).
2. Apri **Storage & Databases → D1 SQL database → Create**.
3. Usa il nome `la-lanterna-verde-db`.
4. Copia il **Database ID** mostrato da Cloudflare.

## 2. Collega il repository GitHub

1. Apri **Workers & Pages → Create application → Import a repository**.
2. Autorizza GitHub e seleziona
   `andrearocca2006-cmyk/la.lanternaverde`.
3. Seleziona il branch di produzione `main`.
4. Lascia vuota la root directory.
5. Nelle impostazioni del token API scegli **Create a new API token**. Parti
   dal modello **Edit Cloudflare Workers**, aggiungi il permesso account
   **D1 → Edit** e limita il token al tuo account Cloudflare. Il permesso D1 è
   necessario perché il deploy applica automaticamente le migrazioni del
   database.
6. Imposta **Build command** su `pnpm cloudflare:build`.
7. Imposta **Deploy command** su `pnpm cloudflare:deploy`.
8. Aggiungi queste variabili di build:

| Nome | Valore |
| --- | --- |
| `CLOUDFLARE_D1_DATABASE_ID` | Il Database ID copiato al punto 1 |
| `CLOUDFLARE_D1_DATABASE_NAME` | `la-lanterna-verde-db` |
| `CLOUDFLARE_WORKER_NAME` | `la-lanterna-verde` |

Avvia la prima pubblicazione. Lo script applica soltanto le migrazioni D1 non
ancora eseguite e poi distribuisce il Worker con gli asset del sito.

## 3. Imposta la password del gestionale

Dopo il primo deploy, apri il Worker e vai in **Settings → Variables &
Secrets**. Aggiungi `ADMIN_PASSWORD` come **Secret** con la password temporanea
scelta. `AUTH_MODE=password` viene già impostato dalla configurazione di deploy.

La password non deve essere aggiunta alle variabili di build, a GitHub o ai
file del repository. Dopo il salvataggio del secret, ridistribuisci l'ultima
versione soltanto se Cloudflare non lo fa automaticamente.

## 4. Controlli finali

- Apri l'URL `https://la-lanterna-verde.<account>.workers.dev` in una finestra
  anonima.
- Effettua una prenotazione DEMO e verifica che risulti confermata.
- Accedi a `/gestione-prenotazioni` con la password impostata.
- Verifica che la prenotazione compaia nel gestionale.

Il progetto resta `noindex` e DEMO. Le email non sono collegate e le
prenotazioni non devono essere considerate reali finché dati, testi legali,
regole del locale e notifiche non vengono approvati.
