# Digitaler Zeitplan Tambourenfest

Eine wiederverwendbare Web-App, die den Zeitplan eines Tambouren- oder
Pfeiferfests übersichtlich darstellt. Die App ist unter

**[randombenj.github.io/digitaler-zeitplan-tambourenfest](https://randombenj.github.io/digitaler-zeitplan-tambourenfest)**

erreichbar und wird via GitHub Actions automatisch auf GitHub Pages deployed,
sobald nach `master` gepusht wird.

Jeder Zeitplan liegt unter einer eigenen Route, z.B. `#/lenzburg-25` oder
`#/langenthal-25`, und kann direkt verlinkt oder per `iframe` in eine
bestehende Vereinswebsite eingebettet werden.

## Lokale Entwicklung

```bash
npm install
npm run start
```

Die App ist dann auf <http://localhost:3000> verfügbar.

## Neuen Zeitplan anlegen

Es gibt eine eingebaute Admin-Oberfläche, mit der ein neuer Zeitplan ohne
Code-Änderungen angelegt, aktualisiert oder gelöscht werden kann:

**[randombenj.github.io/digitaler-zeitplan-tambourenfest/#/admin](https://randombenj.github.io/digitaler-zeitplan-tambourenfest/#/admin)**

Benötigt werden:

1. **Zeitplan-Name** im Format `ort-jahr` (z.B. `lenzburg-25`).
2. **Primärfarbe** als Hex-Code für die UI des Zeitplans.
3. **Zeitplan Excel** mit den Vorträgen / Teilnehmer:innen.
4. **Wettspielorte Excel** mit genau zwei Spalten: `Abkürzung` und
   `Google Maps URL`.
5. **GitHub Personal Access Token** mit `repo`-Berechtigung auf
   `randombenj/digitaler-zeitplan-tambourenfest`.

Die Admin-Oberfläche committet alle Dateien atomar auf `master`; das Deployment
auf GitHub Pages läuft anschliessend automatisch.

### Manuell

Alternativ kann ein Zeitplan auch direkt im Repository angelegt werden:

1. Neuen Ordner `public/<ort-jahr>/` erstellen.
2. `zeitplan.csv` und `wettspielorte.json` darin ablegen (Format siehe
   bestehende Beispiele unter `public/lenzburg-25/`).
3. Eintrag in `public/events.json` ergänzen:

   ```json
   {
     "name": "ort-jahr",
     "primaryColor": "#3e82c4"
   }
   ```

4. Änderung nach `master` pushen — der Workflow
   `.github/workflows/deploy.yml` baut und deployed die Seite automatisch.

## Zeitplan einbetten

Um einen Zeitplan in eine andere Website einzubetten, kann der folgende Code
verwendet werden. `ZEITPLAN-JAHR` durch den Namen des gewünschten Zeitplans
ersetzen (z.B. `lenzburg-25`):

```html
<iframe id="zeitplan"
        src="https://randombenj.github.io/digitaler-zeitplan-tambourenfest/#/ZEITPLAN-JAHR"
        style="border: 0px; min-height: 400px; height: 680px;"
        width="100%"></iframe>
<script>
window.addEventListener("message", (event) => {
  if (event.data.startsWith('resize::')) {
    const height = event.data.replace('resize::', '');
    document.getElementById('zeitplan').style.height = `${height}px`;
  }
}, false);
</script>
```

Das kleine Script sorgt dafür, dass die Höhe des `iframe` automatisch an den
Inhalt angepasst wird.
