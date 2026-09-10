# Verifica tecnica della ricostruzione

Data del collaudo: 10 settembre 2026. Ambiente: build Vinext/Worker locale, D1 locale isolato, browser Chrome. Nessun tavolo reale e nessuna email coinvolti.

## Esito

- `pnpm test`: 26/26 controlli superati. Il dettaglio macchina è in `REGRESSION-RESULTS.json`.
- `pnpm exec tsc --noEmit`: superato.
- `pnpm lint`: superato, senza errori; rimangono soli avvisi non bloccanti esplicitati dall'output.
- build Sites/Vinext: superata per tutte le route applicative e API.
- D1: migrazione applicata e percorso completo verificato su database locale.

## Percorso reale verificato

1. Scelta del giorno, del numero di ospiti e di una fascia disponibile.
2. Inserimento di dati esclusivamente fittizi con consenso privacy obbligatorio.
3. Riepilogo e salvataggio in modalità manuale con stato `pending`.
4. Recupero tramite token nel frammento URL; nel database è presente soltanto l'hash.
5. Richiesta di modifica: data e orario originali restano invariati finché il gestore non decide.
6. Annullamento: stato `cancelled` e capienza nuovamente disponibile.
7. Presenza nel D1 locale della richiesta di modifica e dello stato finale annullato.

## Responsive

Le misure sono le larghezze effettive dell'area contenuto del browser: 375, 415, 753 e 1425 px, corrispondenti a contenitori di controllo da 390, 430, 768 e 1440 px.

| Pagina | Larghezze | Overflow orizzontale | H1 | Esito specifico |
|---|---:|---|---|---|
| Homepage | 375/415/753/1425 px | assente | uno | CTA mobile visibile soltanto sotto 768 px; nessuna sovrapposizione con avviso o pausa |
| Prenotazione | 375/415/753/1425 px | assente | uno | calendario e controlli presenti, nessun errore visibile |
| Gestionale | desktop diretto e CSS responsive | assente nella vista verificata | uno | accesso negato di default e accesso locale disponibile solo se configurato |

L'accesso autenticato del gestionale è verificato nei test di regressione sia per la chiave locale vincolata a localhost sia per la allowlist Sites. Il browser non conserva credenziali amministrative nel progetto.

## Casi coperti dai test automatici

Validazione e consenso; idempotenza; normalizzazione telefono; token casuale e hash; optimistic locking; modifica e annullamento cliente; disponibilità e intervalli sovrapposti; concorrenza senza overbooking o eventi fantasma; conteggio bambini; gruppi manuali; modifiche amministrative; chiusure ed eccezioni; autenticazione; origine delle scritture; impostazioni versionate; fuso Europe/Rome; coda email non configurata; seed DEMO; conservazione dati.

## Limiti intenzionali della bozza

Foto e video autentici, dati legali, menù/allergeni finali, capienza reale, provider email, scheduler, amministratori e pubblicazione devono essere confermati dal titolare. Il progetto resta `noindex`, usa il tenant `demo` e non effettua invii email.
