# Specifica funzionale recuperata

Questo documento sintetizza in forma pubblicabile i requisiti rintracciati nella conversazione condivisa. Non è una trascrizione grezza: URL di sessione, documenti di lavoro e dettagli non necessari sono intenzionalmente esclusi. Le decisioni già implementate e i limiti del recupero sono in `RECOVERY.md`.

## Obiettivo e vincoli

Realizzare il sito ufficiale dimostrativo di Ristorante Pizzeria La Lanterna Verde, riferito esclusivamente al locale di Via Napoli 99 a Bari. Il sito deve presentare il ristorante in modo autentico e permettere prenotazioni dirette salvate in un database persistente. Un semplice form email, WhatsApp, Instagram, un sito statico o GitHub Pages non sostituiscono backend e gestionale.

La ricostruzione deve restare una bozza DEMO, non indicizzata e separata da qualsiasi attività reale. Non inventare prezzi, piatti, ingredienti mancanti, premi, storia, personale, statistiche, recensioni, dati fiscali o servizi. In caso di dubbio usare un testo prudente e includere il punto tra i dati da confermare con il titolare.

## Direzione visiva

Atmosfera di una trattoria barese contemporanea illuminata dalla luce calda di una lanterna: verde bosco, avorio, pomodoro o terracotta, piccoli dettagli ottone e testo antracite. Titoli serif espressivi e testi sans-serif leggibili. Il risultato deve apparire progettato per il locale e non come un template generico.

Evitare nero/oro da ristorante di lusso, immagini stock presentate come autentiche, persone artificiali attribuite allo staff, stereotipi, bandiere decorative, statistiche inventate, sezioni monotone, animazioni pesanti o lampeggianti.

La prima schermata deve chiarire che si tratta di un ristorante-pizzeria a Bari, il ruolo della cucina italiana e della pizza a lievitazione naturale di 72 ore, la posizione e l'accesso alla prenotazione. CTA principali: prenotazione e menù. Su smartphone è richiesta una CTA fissa che non copra i contenuti.

## Struttura pubblica

1. Hero con titolo, testo, posizione, CTA e scena illustrativa della preparazione di una Margherita.
2. Motivi concreti per scegliere il locale: tradizione, impasto a 72 ore e convivialità.
3. Breve racconto del ristorante senza storia o date non confermate.
4. Menù a categorie con piatti verificabili, collegamento al menù completo, ordine a domicilio e avviso allergeni.
5. Racconto visuale delle 72 ore senza promesse salutistiche.
6. Percorso illustrato dal banco al forno e alla pizza pronta.
7. Galleria soltanto con fotografie autentiche autorizzate; in loro assenza collegamenti ai canali ufficiali e disclosure.
8. Recensioni autentiche con fonte e collegamento, senza testi, autori o punteggi inventati.
9. Parcheggio e servizi mostrati soltanto se confermati; eventuale convenzione segnalata come provvisoria.
10. Posizione con mappa caricata su scelta dell'utente, indicazioni, chiamata e prenotazione.
11. Privacy e cookie provvisori, contatti coerenti e area riservata non pubblicizzata come pagina aperta.

## Hero e animazioni

La hero deve usare un loop illustrativo continuo di circa 12–18 secondi: nuovo impasto, stesura, pomodoro, mozzarella, basilico, pala, forno caldo, breve cottura, estrazione, pizza pronta e ripartenza morbida. Il cuoco non deve essere identificabile o presentato come persona reale del ristorante.

Requisiti: autoplay, loop, muted, playsinline, nessun audio, poster immediato, MP4 o WebM ottimizzato, formato panoramico desktop, versione verticale/crop dedicato mobile, dimensioni stabili, overlay leggibile e fallback statico con `prefers-reduced-motion`. Devono esistere un controllo pausa e disclosure dell'origine illustrativa.

Il resto del sito può usare reveal graduali, luce calda, microinterazioni, feedback di selezione e transizioni morbide. Movimento ridotto, navigazione e prenotazione devono restare pienamente utilizzabili.

## Flusso di prenotazione

- Calendario Europe/Rome con giorni passati, chiusure e date non prenotabili disabilitati.
- Fasce generate dalla configurazione e filtrate in base alla disponibilità persistente.
- Adulti e bambini fino a quattro anni richiesti separatamente.
- Limite online e limite gruppi configurabili; i gruppi restano manuali e non impegnano capienza finché non confermati.
- Dati obbligatori: nome e cognome, telefono, email e consenso privacy.
- Dati facoltativi: allergie/esigenze alimentari, seggiolone, occasione e note.
- Label sempre visibili; marketing separato, facoltativo e non preselezionato.
- Riepilogo completo e pulsante finale «Conferma la prenotazione».
- Salvataggio server-side, codice DEMO non prevedibile, stato esplicito e pagina di conferma.
- File ICS, collegamento riservato, consultazione, richiesta modifica e annullamento.
- Modalità automatica e manuale; la bozza usa quella manuale finché regole e capienza non sono confermate.

La disponibilità deve essere ricontrollata in modo atomico al salvataggio e sui picchi di tutti gli intervalli sovrapposti, non soltanto sullo stesso orario di inizio. Sono richiesti idempotenza, normalizzazione telefono, prevenzione doppioni sovrapposti, snapshot delle impostazioni e controllo di versione nelle modifiche concorrenti.

## Area gestionale

Percorso dedicato e protetto lato server. Nessuna password nel frontend o nel repository. L'accesso ospitato usa identità verificata e allowlist esplicita; una chiave di sviluppo è ammessa soltanto su localhost e se abilitata intenzionalmente.

Il gestore deve poter vedere giorno e settimana, cercare nome/telefono/codice, filtrare per stato, aprire e modificare una richiesta, confermare o rifiutare, segnare arrivata/completata/assente, registrare prenotazioni telefoniche, gestire richieste cliente e note interne, ed esportare CSV in modo sicuro.

Impostazioni richieste: giorni e fasce di apertura, intervallo slot, permanenza al tavolo, capienza, anticipo minimo, giorni massimi prenotabili, limite online e gruppi, conteggio bambini, modalità di conferma, chiusure, disponibilità speciali, messaggi cliente e conservazione dati. Le modifiche devono essere versionate.

## Database, sicurezza e privacy

Persistenza D1 con almeno identificativo, codice, hash token, idempotenza, data/ora e intervallo, adulti/bambini, contatti, richieste, stato, fonte, consensi, timestamp e versione. Audit e outbox non devono generare eventi se la scrittura principale fallisce.

Validazione client/server, origine delle scritture, limite corpo, honeypot, rate limiting, messaggi comprensibili e nessuna esposizione pubblica degli elenchi. Il token cliente deve avere almeno 256 bit di casualità, comparire soltanto nel frammento URL e essere memorizzato soltanto come hash. Raccogliere solo i dati necessari e prevedere una conservazione limitata.

La coda deve predisporre ricezione, avviso al ristorante, conferma, rifiuto, modifica, annullamento e promemoria. Senza provider e credenziali non va simulato alcun invio: mostrare chiaramente che le email non sono collegate.

## Prestazioni, SEO e accessibilità

- Poster hero immediato; video e immagini compressi; font locali; dimensioni esplicite; lazy loading sotto la piega; cache adeguata.
- Un solo H1, title e description naturali, URL puliti, collegamenti interni, dati strutturati Restaurant/LocalBusiness e contatti coerenti.
- In bozza: `noindex`, `nofollow`, `noarchive`, sitemap vuota e nessun analytics/pixel.
- Contrasto almeno WCAG AA, testo principale almeno 16 px, focus evidente, HTML semantico, alt descrittivi e target tattili di almeno 44 px.
- Moduli e calendario completamente utilizzabili da tastiera; errori leggibili; nessun testo essenziale incorporato nelle immagini.

## Responsive e collaudo

Progettazione mobile-first e verifica almeno su contenitori 390×844, 430×932, 768×1024 e 1440×900. Controllare hero/crop, logo, CTA, menù, calendario, orari, adulti/bambini, tabelle e calendario gestionale, CTA fissa, assenza di overflow/testi tagliati/spazi vuoti, poster, video e reduced motion.

Il percorso DEMO deve coprire prenotazione, pagina di conferma, persistenza, richiesta modifica, annullamento e visibilità gestionale. La checklist prima della pubblicazione è in `CHECKLIST.md`; i risultati della ricostruzione sono in `QA.md`.

## Dati da confermare prima della pubblicazione

Logo e media autentici; menù, prezzi, ingredienti e allergeni; orari e chiusure; capienza e regole tavoli; conteggio bambini; permanenza, anticipo e gruppi; servizi e parcheggio; amministratori; testi email e provider; dati legali e privacy; conservazione e backup; dominio e autorizzazione esplicita alla pubblicazione.
