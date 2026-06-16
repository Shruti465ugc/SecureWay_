const express = require('express')
const router = express.Router()
const { readDB, writeDB } = require('../db')
const { getDistanceKm } = require('../utils')

router.post('/', (req, res) => {
  const { lat, lon, userName } = req.body

  if (lat == undefined || lon == undefined) {
    return res.status(400).json({ error: 'lat and lon required' })
  }

  const db = readDB()

  let volunteers = db.volunteers.filter(v => v.available)

  volunteers = volunteers.map(v => {
    return {
      ...v,
      distanceKm: Number(getDistanceKm(lat, lon, v.lat, v.lon).toFixed(2))
    }
  })

  volunteers.sort((a, b) => a.distanceKm - b.distanceKm)
  const nearby = volunteers.slice(0, 3)

  const alert = {
    id: db.nextSosId,
    userName: userName || 'Anonymous',
    lat,
    lon,
    notifiedVolunteers: nearby.map(v => v.id),
    createdAt: new Date().toISOString()
  }

  db.sosAlerts.push(alert)
  db.nextSosId = db.nextSosId + 1
  writeDB(db)

  console.log('SOS triggered by', alert.userName, '-> notifying', nearby.length, 'volunteers')

  res.status(201).json({
    alertId: alert.id,
    message: 'SOS triggered',
    nearbyVolunteers: nearby
  })
})

router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.sosAlerts.reverse())
})

module.exports = router
