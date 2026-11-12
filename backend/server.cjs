const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});


const express = require('express')
const cors = require('cors')
const connectDB = require("./config/mongo");

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express()
app.use(cors())
app.use(express.json())
connectDB();
const reportsRoute = require('./routes/reports')
const volunteersRoute = require('./routes/volunteers')
const sosRoute = require('./routes/sos')
const servicesRoute = require('./routes/services')
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const volunteerApplicationsRoute = require("./routes/volunteerApplications");
const userRoute = require("./routes/user");
const adminAuthRoutes=require("./routes/adminAuth");
const assignedVolunteerRoutes =
require("./routes/assignedVolunteer");

app.use('/api/reports', reportsRoute)
app.use('/api/volunteers', volunteersRoute)
app.use('/api/sos', sosRoute)
app.use('/api/services', servicesRoute)
//app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/volunteer-applications", volunteerApplicationsRoute);
app.use("/api/user", userRoute);
app.use("/api/admin-auth",adminAuthRoutes);
app.use(
  "/api/assigned-volunteer",
  assignedVolunteerRoutes
);

/*app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend" , "dist" , "index.html"))
});
*/

app.get('/', (req, res) => {
  res.send('SafePath backend is running')
})



app.listen(PORT, () => {
  console.log('server started on port ' + PORT)
})
