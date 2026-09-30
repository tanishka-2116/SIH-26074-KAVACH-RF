# KAVACH-RF — SIH 26074

AI/ML-based Panchayat-level weather forecasting and downscaling prototype for agro-meteorological advisory services.

## Smart India Hackathon 2026
- Problem Statement: **26074**
- Theme: Agriculture, FoodTech & Rural Development
- Category: Software
- Team: KAVACH-RF

## Dashboard
This repository currently contains a frontend prototype for the KAVACH-RF Panchayat Weather Intelligence dashboard.

### Core flow
Block-level forecast → KAVACH-RF ML downscaling → Panchayat-level forecast → confidence/uncertainty → actionable advisory

## Run locally

No build step is required.

1. Download/clone the repository.
2. Open `index.html` in a browser.

For a local server:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Next integrations
- IMD / approved weather data ingestion
- ERA5 / ERA5-Land
- ISRO/MOSDAC geospatial layers
- DEM / terrain and land-use features
- KAVACH-RF ML model API
- Real Panchayat boundary GeoJSON
- Forecast confidence and uncertainty service
- Agro-meteorological advisory engine
