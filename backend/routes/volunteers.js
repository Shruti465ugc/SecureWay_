const express = require('express')
const router = express.Router()
const { readDB, writeDB } = require('../db')
const { getDistanceKm } = require('../utils')

router.get('/nearby', (req, res) => {
  const lat = parseFloat(req.query.lat)
  const lon = parseFloat(req.query.lon)
  const radius = req.query.radius ? parseFloat(req.query.radius) : 5

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'lat and lon required' })
  }

  const db = readDB()
  let result = []

  for (const v of db.volunteers) {
    if (!v.available) continue

    const dist = getDistanceKm(lat, lon, v.lat, v.lon)
    if (dist <= radius) {
      result.push({ ...v, distanceKm: Number(dist.toFixed(2)) })
    }
  }

  result.sort((a, b) => a.distanceKm - b.distanceKm)

  res.json(result)
})

router.post('/', (req, res) => {
  const { name, skill, phone, lat, lon } = req.body

  if (!name || lat == undefined || lon == undefined) {
    return res.status(400).json({ error: 'name, lat and lon required' })
  }

  const db = readDB()

  let newId = 1
  if (db.volunteers.length > 0) {
    newId = db.volunteers[db.volunteers.length - 1].id + 1
  }

  const newVolunteer = {
    id: newId,
    name: name,
    skill: skill || 'General Help',
    phone: phone || '',
    lat: lat,
    lon: lon,
    available: true
  }

  db.volunteers.push(newVolunteer)
  writeDB(db)

  res.status(201).json(newVolunteer)
})

module.exports = router
