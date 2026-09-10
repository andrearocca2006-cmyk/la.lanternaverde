# Recupero del progetto — 10 settembre 2026

## Provenienza e limite del recupero

Conversazione condivisa: «Crea sito prenotazioni». Sono stati esaminati tutti i 348 nodi condivisi, inclusi i messaggi dell'utente, aggiornamenti e comandi tecnici visibili. Il repository indicato rispondeva senza branch o commit: clone di repository vuoto. L'URL della conversazione e i collegamenti a documenti di lavoro non vengono ripubblicati nel repository pubblico.

Il progetto era già presente all'inizio della conversazione condivisa in `/workspace/sites/la-lanterna-verde`. Quindi anche la condivisione parte da un lavoro antecedente. Gli output che contenevano i file e molte patch sono oscurati con «The output of this plugin was redacted». Sono leggibili alcuni comandi di modifica, ma non i file di partenza. Non è stato recuperato un archivio originale, il database o il repository Sites dell'altro account. Nell'account attuale non risultava un Site accessibile da riutilizzare.

Questa versione è una ricostruzione documentata, non una copia byte per byte. Non sono stati riutilizzati identificativi, credenziali o token del vecchio account. Il contenuto grezzo della conversazione non va committato, perché può includere dati di sessione.

## Requisiti iniziali

La specifica funzionale sanitizzata è conservata in REQUIREMENTS.md. Locale esclusivo: La Lanterna Verde di Via Napoli 99, Bari. Homepage emozionale, prenotazione diretta reale con backend e database, gestione protetta, bozza privata/noindex, prove DEMO. Vietata una soluzione statica o WhatsApp come sostituto del sistema.

## Struttura e design richiesti

Hero cinematografica, motivi per scegliere il locale, racconto, menù per categorie, pizza 72 ore, percorso della pizza, galleria autentica, recensioni autentiche, parcheggio provvisorio, posizione/mappa, CTA. Verde bosco, avorio, pomodoro/terracotta, ottone, serif espressiva e sans leggibile. Navigazione sticky, griglie, card, layout asimmetrico, CTA fissa mobile. Niente premi, prezzi, storie o dati legali inventati.

## Stato più avanzato osservabile nella vecchia chat

- Stack già presente: React/TypeScript, Vinext, Worker, D1 e Drizzle; `app/server.ts`, `app/api/data/route.ts`, `app/config.ts`, componenti Home/Shell/Motion/Booking/Reservation/Admin/Forms.
- Loop illustrato di 16 secondi integrato con poster e filmato mobile dedicato; pausa e prefers-reduced-motion.
- Controllo capienza corretto per intervalli sovrapposti, non soltanto stesso orario.
- Normalizzazione telefoni italiani e prevenzione doppioni per telefono durante intervalli sovrapposti.
- Gruppi sempre manuali; richieste di gruppo in attesa senza consumo capienza, verifica alla conferma.
- Conteggio dei bambini configurabile; massimo gruppo aggiunto; codice DEMO allungato.
- Impostazioni lette con snapshot; guardia contro modifiche concorrenti; versionamento per annullamento/modifica.
- Calendario da tastiera e correzioni ID cliente; ritocchi contrasto, aree di tocco e calendario/gestionale responsive.
- L'assistente precedente dichiarava 21 verifiche superate (persistenza, simultaneità, capienza, modifica, annullamento, accessi).
- Ultima prova mobile dichiarata: prenotazione salvata in attesa, modifica registrata, annullamento con disponibilità liberata.
- Ultimi comandi: ritocchi singolare/plurale, CSS gestionale mobile, controllo font/pesi. Non è visibile una consegna finale con un nuovo commit/deployment verificabile dopo questi interventi.

I test dichiarati in quella conversazione sono evidenze storiche, non test eseguiti automaticamente sulla ricostruzione.

## Differenze e parti non recuperabili

- Immagini autentiche, logo e video originali non disponibili: sequenza AI illustrativa nuova, visibilmente dichiarata; galleria collegata alle fonti senza foto inventate.
- Titoli/link di tre recensioni recuperati; testi e nomi completi non disponibili. Le card rimandano agli originali senza inventare citazioni o rating.
- Foglio Google dei 50 controlli citato ma suo contenuto integrale non recuperato: CHECKLIST.md è una verifica ricostruita dai criteri espliciti nel prompt, non la trascrizione certificata del foglio.
- Nuove migrazioni: schema ricostruito, non migrazione dei vecchi dati. Solo tenant `demo` abilitato.
- Autenticazione Sites predisposta con allowlist server-side; accesso di sviluppo opzionale, esclusivamente su localhost. Nessun amministratore di produzione viene inventato.
- Notifiche in outbox `not_configured`: nessun invio simulato. Provider, scheduler e gestione invii sono da collegare.
- Sitemap vuota intenzionalmente in bozza; da popolare con il dominio approvato all'apertura pubblica.

## Regole per continuare

GitHub è il sorgente principale. Seguire AGENTS.md: fetch prima di modificare, confronto con remoto, nessuna riscrittura di storia. Non copiare credenziali o dati runtime nel repository. Il codice supporta D1 locale persistente e build Worker; un database ospitato, backup e segreti hanno un ciclo distinto dal backup del codice.
