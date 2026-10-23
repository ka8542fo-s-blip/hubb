# Hubb

Omslag, bilder och widgets till min Notion-hubb. GitHub Pages publicerar filerna på
https://ka8542fo-s-blip.github.io/hubb/ och Notion hämtar dem därifrån.

## Mappar

| Mapp | Innehåll |
| --- | --- |
| `omslag/` | Sidomslag (1500 × 600) till Hubb och de sex områdena |
| `kort/` | Bilder till galleriet Områden (600 × 380) |
| `widgets/` | HTML-widgets som bäddas in i Notion med embed-block |
| `fonts/` | Inter, Bebas Neue och Comfortaa, alla under SIL Open Font License 1.1 |
| `verktyg/` | Skriptet som ritar omslag, kort och fokustimerns bakgrund |

## Widgets

| Fil | Visar |
| --- | --- |
| `klocka.html` | Klocka med vecka, veckodag och hälsning |
| `fokus.html` | Fokustimer (25, 5 och 15 minuter) som räknar dagens pass |
| `tid.html` | Hur stor del av dagen, veckan, månaden, året och terminen som har gått |
| `tenta.html` | Nedräkning till nästa tenta |

`tenta.html` läser sina uppgifter från adressen, till exempel:

```
widgets/tenta.html?namn=Databaser%20–%20salstenta&datum=2026-11-17&info=5%20h&fran=2026-08-31
```

- `namn`: tentans namn
- `datum`: tentadagen (ÅÅÅÅ-MM-DD)
- `info`: extra text efter datumet (valfri)
- `fran`: dagen förloppsstapeln börjar räkna från
- `rubrik`: ersätter rubriken "Nästa tenta" (valfri)

Terminen i `tid.html` är HT26, 31 augusti 2026 till 17 januari 2027. Lägg in nästa termin i listan `TERMS` innan HT26 tar slut.

## Nya omslag och kort

`verktyg/neon.html` ritar tegelväggen, neontexten (typsnittet Comfortaa) och ikonen. `verktyg/render.js` sparar bilderna som JPEG i `omslag/`, `kort/` och `widgets/`. Ändra eller lägg till en rad i `jobs` i render.js och kör från repots rot:

```
npm install --no-save playwright sharp
npx playwright install chromium
node verktyg/render.js omslag/hem
```

Utan argument ritas alla bilder om. Ikonerna som finns är compass, shield, cap, building, rocket, chart och home.
