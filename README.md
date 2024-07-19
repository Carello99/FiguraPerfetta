# Figura Perfetta

FiguraPerfetta è un progetto semplice realizzato con Ionic e Angular. Si tratta di un gioco in cui, dopo aver selezionato una figura, l'utente ha la possibilità di disegnarla. Il programma analizza automaticamente il disegno e fornisce una valutazione della precisione espressa in percentuale. Questo progetto è ideale per chi è alle prime armi con queste tecnologie e desidera esplorare un'applicazione funzionante.

## Installazione

Di seguito elencherò una serie di strumenti necessari all'installazione del progetto:

- [Node.js](https://nodejs.org/en/download/package-manager) e npm
- Ionic CLI
```bash
npm install -g @ionic/cli
```
- Anugular CLI
```bash
npm install -g @angular/cli
```
- Capacitor
```bash
npm install @capacitor/core @capacitor/cli
```
- [Visual Studio Code](https://code.visualstudio.com/download)versione 1.91.1

## Server per lo sviluppo

Esegui `ionic serve`per avviare il server di sviluppo. Naviga sull'indirizzo IP e la porta indicate da terminale. L'applicazione si ricaricherà automaticamente se modifici uno dei file sorgente. Invece per far partire il server in tutta la rete locale esegui `ionic serve --external`
```bash
ionic serve
```
```bash
ionic serve --external
```

## Build

Essendo un progetto ionic la build può essere fatta sia per Android che per IOS. Tutto ciò avviene tramite l'uso di Capacitor e successivamente tramite le apposite piattaforme come [Android Studio](https://developer.android.com/studio?hl=it) e [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12/).

## Installazione APK

Puoi anche installare l'APK di [FiguraPerfetta](./releases/FiguraPerfetta.apk)

## Autore

- [@Francesco Carello](https://github.com/Carello99)