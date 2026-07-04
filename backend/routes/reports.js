const express = require('express')
const router = express.Router()
const { readDB, writeDB } = require('../db')

router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.reports.reverse())
})

router.get('/stats', (req, res) => {
  const db = readDB()

  let stats = {
    Accident: 0,
    Fire: 0,
    'Medical Emergency': 0,
    Crime: 0,
    Flood: 0,
    Other: 0
  }

  for (let i = 0; i < db.reports.length; i++) {
    const type = db.reports[i].incidentType
    if (stats[type] != undefined) {
      stats[type] = stats[type] + 1
    }
  }

  res.json(stats)
})

router.post('/', (req, res) => {
  const body = req.body

  if (!body.incidentType) {
    return res.status(400).json({ error: 'incidentType is required' })
  }

  const db = readDB()

  const newReport = {
    id: db.nextReportId,
    code: 'SR-' + (1000 + db.nextReportId),
    incidentType: body.incidentType,
    description: body.description || '',
    location: body.location || null,
    severity: body.severity || 'Medium',
    anonymous: body.anonymous ? true : false,
   status: 'Pending',
    createdAt: new Date().toISOString()
  }

  db.reports.push(newReport)
  db.nextReportId = db.nextReportId + 1

  writeDB(db)

  console.log('new report submitted:', newReport.code)

  res.status(201).json(newReport)
})
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    'Pending',
    'In Progress',
    'Resolved'
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Invalid status'
    });
  }

  const db = readDB();

  const report = db.reports.find(
    r => r.id === Number(req.params.id)
  );

  if (!report) {
    return res.status(404).json({
      error: 'Report not found'
    });
  }

  report.status = status;

  writeDB(db);

  res.json(report);
});

module.exports = router
