---
title: "Quanto costa un progetto di intelligenza artificiale per una PMI"
seoTitle: "Quanto costa un progetto di intelligenza artificiale per una PMI | Francesco Vigni"
description: "Da cosa dipende il costo di un progetto AI in una piccola o media impresa: analisi, dati, prototipo, integrazione e costi di esercizio. Come fare un budget a tappe e come misurare il ritorno."
lede: "Non esiste un prezzo di listino per «l'AI». Esiste il costo di un processo preciso reso più veloce o meno soggetto a errori. Questa guida spiega da cosa dipende, cosa si paga una volta e cosa ogni mese, e come impostare un budget che puoi fermare prima di sprecare soldi."
updated: 2026-09-18
order: 1
services: ["valutazione-progetto-ai", "automazione-documenti-ai"]
---

## Dove sono oggi le PMI italiane

Nel 2025 il 16,4% delle imprese italiane con almeno 10 addetti usava almeno una tecnologia di intelligenza artificiale, il doppio dell'anno prima, contro il 20,0% della media europea ([Istat, Imprese e ICT 2025](https://www.istat.it/comunicato-stampa/imprese-e-ict-anno-2025/); [Eurostat](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2)). Il divario è tutto nelle imprese più piccole: la usa il 14,2% di quelle tra 10 e 49 addetti, il 27,6% tra 50 e 249, il 53,1% delle grandi ([Eurostat, isoc_eb_ai](https://ec.europa.eu/eurostat/databrowser/view/isoc_eb_ai/default/table?lang=en)).

Tra le imprese che ci hanno pensato ma non l'hanno adottata, i costi elevati sono un freno per il 43%, ma non il primo: prima vengono la mancanza di competenze (58,6%), le regole poco chiare (47,3%) e dati assenti o di scarsa qualità (45,2%). In altre parole, la domanda «quanto costa» spesso nasconde un'altra domanda: «da dove comincio, e con quali dati?».

## Perché non esiste un prezzo unico

Chiedere quanto costa un progetto di intelligenza artificiale è come chiedere quanto costa un capannone: dipende da cosa ci devi fare dentro. Lo stesso strumento, per esempio un modello che legge documenti, può costare poco se i documenti sono tutti uguali e il risultato finisce in un foglio di calcolo, e molto di più se arrivano in venti formati diversi e il risultato deve entrare in un gestionale senza interfacce.

Il costo lo decidono cinque cose, quasi sempre in quest'ordine di peso:

1. **Quanto è chiaro il processo.** Se nessuno sa descrivere bene come si fa oggi, la prima spesa è capirlo.
2. **In che stato sono i dati.** Documenti sparsi, immagini senza etichette, eccezioni gestite a memoria: tutto questo va sistemato prima che un modello possa impararlo.
3. **Quanto errore puoi tollerare.** Passare da un sistema giusto nel 90% dei casi a uno giusto nel 99% costa molto più del primo 90%.
4. **Con cosa va collegato.** Gestionale, PLC, email, cartelle condivise. L'integrazione è spesso la voce più grande, e la meno visibile nelle demo.
5. **Dove deve girare.** In cloud con un servizio a consumo, oppure su un server tuo perché i dati non possono uscire.

## Le cinque voci di costo

### 1. Analisi del processo

Si guarda il processo com'è oggi, si misura quanto costa in ore ed errori e si decide se l'AI è la risposta giusta. È la voce più piccola e quella che fa risparmiare di più, perché ferma i progetti che non conviene fare. Il risultato è una raccomandazione scritta: cosa automatizzare, con quale approccio, quanto costerà il resto e con quali rischi.

### 2. Dati

Raccolta, pulizia e, quando serve, etichettatura. Per un modello che legge documenti bastano spesso esempi reali già in archivio. Per un sistema di visione artificiale servono immagini dei pezzi buoni e difettosi, scattate nelle condizioni reali della linea. Qui il tempo delle tue persone conta quanto quello del consulente: qualcuno in azienda deve dire che cosa è giusto e che cosa no.

### 3. Prototipo

Una prima versione che lavora sui tuoi dati veri e viene misurata: quanti documenti letti correttamente, quanti difetti trovati, quanti falsi allarmi. Il prototipo serve a una sola cosa, decidere se andare avanti guardando dei numeri invece di una demo. Oggi quasi mai si addestra un modello da zero: si parte da modelli esistenti e si adattano al caso, e questo abbassa molto il costo di questa fase.

### 4. Integrazione e messa in produzione

Collegare il sistema agli strumenti che usate ogni giorno, gestire i casi incerti con una revisione umana, tenere un registro di cosa ha fatto l'AI, formare chi lo userà. È la fase che separa una demo da uno strumento di lavoro, ed è spesso la più costosa. Un gestionale con un'interfaccia (API) moderna la rende più semplice; un gestionale vecchio senza API può raddoppiarla.

### 5. Esercizio e manutenzione

I costi che si pagano ogni mese: il consumo del modello o il server su cui gira, il monitoraggio, gli aggiornamenti. I dati cambiano nel tempo (nuovi fornitori, nuovi prodotti, una luce diversa in linea) e un sistema che nessuno controlla peggiora in silenzio. Mettere a budget la manutenzione fin dall'inizio evita la sorpresa dopo sei mesi.

## Costi di esercizio: servizio a consumo o server tuo?

Qui c'è la sorpresa più frequente: per molti progetti **il modello è la voce più piccola**. Prezzi di listino a settembre 2026, in dollari per milione di «token» (un token è circa tre quarti di parola):

- modelli piccoli dei principali fornitori: da circa 0,15 a 1 dollaro in ingresso e da 0,60 a 5 dollari in uscita;
- modelli intermedi: circa 1,5-2 dollari in ingresso e 7-12 dollari in uscita.

Un esempio: leggere 1.000 documenti al mese, di qualche pagina ciascuno, vuol dire circa 3 milioni di token in ingresso e mezzo milione in uscita. Con un modello intermedio sono una decina di dollari al mese; con uno piccolo, da uno a pochi dollari. I prezzi aggiornati sono sulle pagine dei fornitori, per esempio [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://claude.com/pricing) e [Mistral](https://mistral.ai/pricing/api/).

Se invece i dati non possono uscire dall'azienda, il modello gira su hardware tuo o dedicato:

- **una GPU in un cloud europeo**, sempre accesa, costa intorno ai 550-600 euro al mese più IVA per una scheda di fascia inferenza come la NVIDIA L4 ([OVHcloud](https://www.ovhcloud.com/it/public-cloud/prices/), [Scaleway](https://www.scaleway.com/en/pricing/gpu/)), meno se la accendi solo quando serve;
- **un dispositivo edge in linea** per la visione artificiale, come un NVIDIA Jetson Orin, parte da circa 400 dollari per il kit di sviluppo più piccolo e arriva a qualche migliaio per i moduli più potenti ([NVIDIA](https://developer.nvidia.com/embedded/faq)), a cui si aggiungono telecamera, illuminazione e installazione;
- **un server in azienda** con una GPU è un investimento una tantum che conviene quando l'uso è continuo e i volumi sono alti.

La scelta tra queste strade la decidono i dati e i volumi, non la moda. Il servizio a consumo è quasi sempre il modo più economico per partire; il server tuo è la scelta giusta quando la riservatezza lo impone o quando i volumi lo rendono conveniente.

## Cosa fa salire il conto

- **Dati sparsi e incoerenti**, con eccezioni che «sa solo Mario».
- **L'obiettivo dell'errore zero.** Meglio progettare un sistema che fa il grosso e passa i casi dubbi a una persona.
- **Integrazioni con sistemi vecchi** senza interfacce.
- **Requisiti on-premise** quando i dati sono sensibili: giusti, ma vanno messi a budget (hardware, installazione, aggiornamenti).
- **Partire troppo largo.** «Automatizziamo l'ufficio acquisti» costa molto più di «leggiamo in automatico gli ordini dei tre clienti più grandi».

## Cosa lo fa scendere

- **Un processo stretto e frequente** come primo obiettivo: poco da costruire, tanto da risparmiare.
- **Modelli esistenti** invece di modelli addestrati da zero.
- **Una persona nel giro** per i casi incerti, invece di inseguire l'automazione totale.
- **Un prodotto pronto**, quando esiste e fa già quello che ti serve. Un buon consulente te lo dice anche se significa lavorare meno.
- **I contributi pubblici**, che in molti casi coprono una parte di consulenza e tecnologia: li trovi nella [guida a bandi e contributi](/it/guide/bandi-contributi-intelligenza-artificiale-pmi/).

## Come impostare il budget a tappe

Il modo più sicuro di spendere bene è non impegnarsi tutto subito. Ogni tappa finisce con una decisione presa sui numeri:

1. **Analisi.** Esce una stima dell'intero progetto e del risparmio atteso. Se non conviene, ci si ferma qui, avendo speso poco.
2. **Prototipo.** Esce una misura reale sui tuoi dati. Se i numeri non bastano, ci si ferma prima di pagare l'integrazione.
3. **Produzione.** Si paga l'integrazione solo per qualcosa che ha già dimostrato di funzionare.
4. **Esercizio.** Un costo mensile noto in anticipo, confrontabile con il risparmio.

## Come misurare il ritorno

Il conto più utile è anche il più semplice: quanto costa oggi il processo, quanto costerà dopo. Un esempio con numeri di fantasia: se una persona passa due ore al giorno a ricopiare ordini, sono circa 440 ore l'anno su 220 giorni lavorativi. Se il sistema ne toglie tre quarti, liberi circa 330 ore l'anno da spostare su lavoro che conta di più. A quel valore aggiungi gli errori evitati (un ordine sbagliato, un difetto arrivato al cliente) e confronta il totale con il costo del progetto più quello di esercizio.

Se il conto non torna nemmeno sulla carta, meglio saperlo nella fase di analisi. È esattamente lo scopo della [valutazione di un progetto AI](/it/servizi/valutazione-progetto-ai/).
