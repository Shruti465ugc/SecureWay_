const path = require("path");
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

const app = express()

app.use(cors())
app.use(express.json())

const reportsRoute = require('./routes/reports')
const volunteersRoute = require('./routes/volunteers')
const sosRoute = require('./routes/sos')
const servicesRoute = require('./routes/services')
const adminRoute = require("./routes/admin");
const volunteerApplicationsRoute = require("./routes/volunteerApplications");

app.use('/api/reports', reportsRoute)
app.use('/api/volunteers', volunteersRoute)
app.use('/api/sos', sosRoute)
app.use('/api/services', servicesRoute)
app.use(express.static(path.join(_dirname, '/frontend/dist')))
app.use("/api/admin", adminRoute);
app.use("/api/volunteer-applications", volunteerApplicationsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend" , "dist" , "index.html"))
});

app.get('/', (req, res) => {
  res.send('SafePath backend is running')
})



app.listen(PORT, () => {
  console.log('server started on port ' + PORT)
})
