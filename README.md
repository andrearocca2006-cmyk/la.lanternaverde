# La Lanterna Verde — sito e prenotazioni

Sorgente principale: https://github.com/andrearocca2006-cmyk/la.lanternaverde.git

Ricostruzione del progetto di Ristorante Pizzeria La Lanterna Verde, Via Napoli 99, Bari, dalla conversazione condivisa. Prima di intervenire leggere [stato del recupero](docs/RECOVERY.md), [specifica funzionale recuperata](docs/REQUIREMENTS.md), [verifica tecnica](docs/QA.md), [checklist](docs/CHECKLIST.md) e [regole di continuità](AGENTS.md).

## Stato

Bozza DEMO, noindex/nofollow/noarchive. Tutte le prenotazioni sono isolate nel tenant `demo`; non riservano tavoli reali. Il sorgente comprende frontend, API Worker, schema D1, migrazione, media e istruzioni riproducibili. La pubblicazione pubblica, i dati reali e l'email non sono attivati.

## Avvio da GitHub

Richiede Node.js 22.13+ e la versione pnpm indicata nel package.json. Non richiede i file temporanei di ChatGPT Work.

```sh
git clone https://github.com/andrearocca2006-cmyk/la.lanternaverde.git
cd la.lanternaverde
corepack enable
pnpm install --frozen-lockfile
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_lively_puma.sql
pnpm start
```

Applicare la migrazione una volta per database nuovo. Le modifiche allo schema richiedono nuove migrazioni append-only tramite `pnpm db:generate`.

Per sviluppo: `pnpm dev`. Per la regressione: `pnpm test`. Per la verifica dei tipi: `pnpm exec tsc --noEmit`. `pnpm build` genera bundle client, Worker ESM e configurazione locale. La cartella `.wrangler/state` contiene il database locale persistente e non va committata.

## Area gestionale

Percorso: `/gestione-prenotazioni`.

Su Sites: configurare sul server `AUTH_MODE=sites` e `ADMIN_USER_IDS` con l'elenco esplicito degli ID utenti autorizzati. Il dispatcher deve autenticare e sostituire gli header `oai-authenticated-user-*`: non esporre direttamente un Worker che si fida di header arbitrari. Il login ChatGPT da solo non attribuisce il ruolo di amministratore. Senza allowlist l'accesso è negato.

Per sviluppo locale creare `.env` da `.env.example`, abilitare `ALLOW_LOCAL_ADMIN=true` e impostare `LOCAL_ADMIN_TOKEN` a un valore casuale lungo. Riavviare il server, aprire il gestionale su localhost ed usare «Accesso di sviluppo locale». La chiave resta solo in memoria nel browser. Questa modalità è rifiutata su host non locali e deve rimanere disabilitata nell'ambiente ospitato. Nessuna password nel frontend o nel repository.

## Funzionalità

- Homepage responsive con menù a categorie, timeline 72 ore, preparazione pizza, mappa a caricamento volontario, collegamenti ufficiali.
- Hero illustrativa 15,6 secondi desktop/mobile, poster immediato, pausa, fallback statico.
- Calendario, orari disponibili, adulti e bambini separati, gruppi, dati contatto, riepilogo e conferma manuale/automatica.
- Salvataggio D1, token casuale a 256 bit (solo hash nel database), link riservato nel frammento URL, codice DEMO, ICS, modifica e annullamento.
- Controllo atomico capienza sui picchi degli intervalli sovrapposti, idempotenza, normalizzazione telefono, snapshot impostazioni e versionamento modifiche.
- Gestionale giorno/settimana, ricerca/filtri, tutti gli stati, prenotazioni telefoniche, note interne, CSV protetto dalle formule.
- Impostazioni apertura, fasce, permanenza, capienza, anticipo, chiusure, disponibilità speciali, limiti online/gruppi, conteggio bambini, messaggi e conservazione.
- Outbox notifiche non collegate, consensi separati, privacy/cookie provvisori, cancellazione dati scaduti.

## Struttura

| Percorso | Contenuto |
|---|---|
| `app/ui/` | Homepage, animazioni, prenotazione, conferma, gestionale |
| `app/api/data/route.ts` | API pubblica e amministrativa con controlli server |
| `app/server.ts` | Validazione, autenticazione, regole prenotazione e SQL atomico |
| `app/config.ts` | Dati locale, impostazioni DEMO e calendario Europe/Rome |
| `db/`, `drizzle/` | Schema, migrazione SQL e metadati |
| `public/motion/`, `public/fonts/` | Media e caratteri locali |
| `docs/media/` | Storyboard, prompt e sorgente di assemblaggio video |
| `docs/` | Requisiti, recupero, checklist e verifiche |
| `scripts/` | Avvio/build riproducibili e test di regressione |
| `.openai/hosting.json` | Binding logico D1; nessuna identità del vecchio account |

## Prima della pubblicazione

Confermare logo/foto/video autentici, menù e allergeni, orari, capienza e tavoli, conteggio bambini, permanenza, gruppi, amministratori, notifiche, dati legali, privacy e parcheggio. Completare foto/recensioni e il confronto col foglio originale. Collegare provider email e scheduler, backup del database, protezione dell'ambiente e politica di conservazione automatica. Nessun deployment pubblico o dominio definitivo è implicito nel salvataggio GitHub.

## Ogni modifica futura

```sh
git fetch origin
git status
git log --oneline --decorate -5
```

Partire dal remoto più recente, preservare modifiche locali, verificare, committare e fare push. Mai `git push --force`. Non aggiungere `.env`, database, esportazioni clienti o file della vecchia sessione. GitHub conserva il codice; per i dati delle prenotazioni servono backup D1 separati.
