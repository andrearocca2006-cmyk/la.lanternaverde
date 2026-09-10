# Checklist di continuità e pubblicazione

La checklist distingue quanto è già implementato nella ricostruzione da ciò che richiede ancora dati o decisioni del ristorante. I riferimenti DEMO non equivalgono a una messa in produzione.

## Sorgente e continuità

1. [x] Requisiti della conversazione condivisa archiviati in `REQUIREMENTS.md`.
2. [x] Stato recuperato e parti ricostruite descritti in `RECOVERY.md`.
3. [x] GitHub dichiarato sorgente principale nel README e in `AGENTS.md`.
4. [x] Regola di controllo del remoto prima di ogni modifica documentata.
5. [x] Stack e comandi di installazione/build riproducibili.
6. [x] Lockfile pnpm versionato.
7. [x] Variabili d'ambiente di esempio prive di segreti.
8. [x] Database locali, `.env`, build e file temporanei esclusi da Git.
9. [x] Migrazione D1 iniziale versionata.
10. [x] Test di regressione e relativo esito versionati.

## Esperienza pubblica

11. [x] Homepage responsive con una gerarchia H1 corretta.
12. [x] Navigazione desktop, mobile e link di salto al contenuto.
13. [x] Hero illustrativa distinta chiaramente da immagini autentiche.
14. [x] Video responsive silenzioso, poster, pausa e fallback reduced-motion.
15. [x] CTA mobile senza sovrapposizione con avviso o pausa.
16. [x] Menù organizzato in categorie con link alla fonte completa.
17. [x] Indicazione che prezzi, ingredienti e allergeni vanno confermati.
18. [x] Timeline illustrativa delle 72 ore.
19. [x] Sequenza animata della preparazione della pizza.
20. [x] Sezione foto senza immagini autentiche inventate.
21. [x] Recensioni collegate alla fonte senza citazioni attribuite artificialmente.
22. [x] Mappa caricata soltanto dopo scelta dell'utente.
23. [x] Informazione parcheggio segnalata come provvisoria.
24. [x] Privacy e cookie provvisori raggiungibili.
25. [x] `robots.txt`, metadata e sitemap impediscono l'indicizzazione della bozza.

## Prenotazioni

26. [x] Calendario accessibile da tastiera e date non valide disabilitate.
27. [x] Adulti e bambini fino a quattro anni gestiti separatamente.
28. [x] Richieste per gruppi sempre soggette a conferma manuale.
29. [x] Disponibilità ricontrollata sul server al salvataggio.
30. [x] Capienza atomica sui picchi degli intervalli sovrapposti.
31. [x] Prevenzione del doppio invio tramite idempotenza.
32. [x] Prevenzione dei doppioni telefonici sugli orari sovrapposti.
33. [x] Consenso privacy obbligatorio e marketing separato facoltativo.
34. [x] Honeypot, limiti del corpo e rate limiting lato server.
35. [x] Token cliente casuale a 256 bit, salvato nel database solo come hash.
36. [x] Token nel frammento URL, non inviato al server durante la navigazione.
37. [x] Stato, codice DEMO, ICS, richiesta modifica e annullamento disponibili.
38. [x] Versionamento ottimistico sulle modifiche cliente e gestore.
39. [x] Coda notifiche persistente ma dichiarata non collegata.
40. [x] Eliminazione manuale dei dati oltre la conservazione configurata.

## Gestionale e decisioni prima del lancio

41. [x] Gestionale giorno/settimana, ricerca, filtri e tutti gli stati.
42. [x] Prenotazione telefonica, note interne e gestione richieste di modifica.
43. [x] CSV protetto dall'iniezione di formule.
44. [x] Impostazioni versionate per orari, capienza, regole, chiusure ed eccezioni.
45. [x] Accesso chiuso di default; allowlist Sites e modalità locale documentate.
46. [ ] Confermare con il titolare logo, fotografie e video autentici.
47. [ ] Confermare menù, prezzi, ingredienti, allergeni, orari e parcheggio.
48. [ ] Confermare capienza, durata tavolo, regole bambini, gruppi e anticipo minimo.
49. [ ] Configurare amministratori, email, mittente, scheduler, backup e conservazione automatica.
50. [ ] Completare dati legali/privacy e approvare esplicitamente dominio e pubblicazione.
