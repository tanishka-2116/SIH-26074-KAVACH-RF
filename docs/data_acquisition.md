# KAVACH-RF — Data Acquisition

## Objective

KAVACH-RF requires historical weather and rainfall observations for training and evaluating the machine-learning model.

The initial training dataset will prioritize official meteorological data from the India Meteorological Department (IMD).

## Primary Source

India Meteorological Department (IMD)

Official website:

https://mausam.imd.gov.in/

## Planned Data

The dataset should contain, where available:

- Date
- State
- District
- Block
- Rainfall
- Temperature
- Humidity
- Wind speed
- Cloud cover
- Geographic information

## Data Processing

The acquired data will be:

1. Validated
2. Cleaned
3. Deduplicated
4. Standardized
5. Joined with geographic information where required
6. Converted into model-ready features

## Important

The repository will distinguish between:

- Official observations
- Derived features
- Machine-learning predictions
- Dashboard demonstration data

No fabricated observations will be used as training data.

## Current Status

**Data acquisition: In progress**

The final training dataset will be added to:

```text
data/training_data.csv
