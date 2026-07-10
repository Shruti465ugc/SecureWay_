const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// POST application
router.post("/", (req, res) => {
  const db = readDB();

  if (!db.volunteerApplications) {
    db.volunteerApplications = [];
  }

  if (!db.nextVolunteerApplicationId) {
    db.nextVolunteerApplicationId = 1;
  }

  const application = {
    id: db.nextVolunteerApplicationId++,
    ...req.body,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  db.volunteerApplications.push(application);

  writeDB(db);

  res.status(201).json(application);
});

// GET applications
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.volunteerApplications || []);
});
router.post("/:id/approve", (req, res) => {

    const db = readDB();

    const id = Number(req.params.id);

    const application = db.volunteerApplications.find(
        app => app.id === id
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    application.status = "Approved";

    const volunteer = {
        id: db.volunteers.length + 1,
        name: application.name,
        skill: application.skills,
        phone: application.phone,
        lat: 0,
        lon: 0,
        available: true
    };

    db.volunteers.push(volunteer);

    writeDB(db);

    res.json({
        message: "Volunteer approved."
    });

});
router.delete("/:id", (req, res) => {

    const db = readDB();

    const id = Number(req.params.id);

    db.volunteerApplications =
        db.volunteerApplications.filter(
            app => app.id !== id
        );

    writeDB(db);

    res.json({
        message: "Application deleted."
    });

});

module.exports = router;