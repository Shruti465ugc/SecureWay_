# SafePath backend

Express API for the SafePath app.

To run:
```
npm install
npm start
```

Runs on port 5000.

## Routes

POST /api/reports - submit a report (incidentType, description, location, severity, anonymous)
GET /api/reports - all reports
GET /api/reports/stats - counts per incident type

GET /api/volunteers/nearby?lat=&lon=&radius= - nearby available volunteers
POST /api/volunteers - register volunteer (name, skill, phone, lat, lon)

POST /api/sos - trigger sos (lat, lon, userName), returns nearest 3 volunteers
GET /api/sos - past alerts

GET /api/services/nearby?lat=&lon= - nearby hospitals/police/fire/pharmacy from OSM Overpass

Data is stored in data/db.json, no database setup needed.
