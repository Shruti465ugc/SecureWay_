const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const reportsRoute = require('./routes/reports')
const volunteersRoute = require('./routes/volunteers')
const sosRoute = require('./routes/sos')
const servicesRoute = require('./routes/services')

app.use('/api/reports', reportsRoute)
app.use('/api/volunteers', volunteersRoute)
app.use('/api/sos', sosRoute)
app.use('/api/services', servicesRoute)

app.get('/', (req, res) => {
  res.send('SafePath backend is running')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log('server started on port ' + PORT)
})
