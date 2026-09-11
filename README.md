# La Lanterna Verde — sito e prenotazioni

Sorgente principale: https://github.com/andrearocca2006-cmyk/la.lanternaverde.git

Ricostruzione del progetto di Ristorante Pizzeria La Lanterna Verde, Via Napoli 99, Bari, dalla conversazione condivisa. Prima di intervenire leggere [stato del recupero](docs/RECOVERY.md), [specifica funzionale recuperata](docs/REQUIREMENTS.md), [verifica tecnica](docs/QA.md), [checklist](docs/CHECKLIST.md) e [regole di continuità](AGENTS.md).

## Stato

Bozza DEMO pubblicata per la condivisione tramite link e protetta dall'indicizzazione con `noindex`/`nofollow`/`noarchive`. Tutte le prenotazioni sono isolate nel tenant `demo`; non riservano tavoli reali. Il sorgente comprende frontend, API Worker, schema D1, migrazione, media e istruzioni riproducibili. I dati reali e l'email non sono attivati.

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

L’accesso usa un’unica password verificata sul server. Configurare `AUTH_MODE=password` e salvare `ADMIN_PASSWORD` esclusivamente come segreto dell’ambiente ospitato; la password non deve comparire nel frontend o nel repository. Il browser la conserva soltanto in memoria fino alla chiusura o al ricaricamento della pagina.

## Funzionalità

- Homepage responsive con menù a categorie, timeline 72 ore, mappa a caricamento volontario e collegamenti ufficiali.
- Hero illustrativa statica ad alta risoluzione, con composizione dedicata per desktop e smartphone.
- Calendario, orari disponibili, adulti e bambini separati, gruppi, dati contatto, riepilogo e conferma automatica con controllo finale della capienza.
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
