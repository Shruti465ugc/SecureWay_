import { useState, useEffect } from "react";
import {
    AlertTriangle,
    Car,
    Flame,
    Ambulance,
    ShieldAlert,
    Waves,
    MapPin,
} from "lucide-react";

import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";
import "../styles/Report.css";

function Report() {
    const [incidentType, setIncidentType] = useState("");
    const [reportCode, setReportCode] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [severity, setSeverity] = useState("Medium");
    const [anonymous, setAnonymous] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [stats, setStats] = useState({
        Accident: 0,
        Fire: 0,
        "Medical Emergency": 0,
        Crime: 0,
    });

    const [recentReports, setRecentReports] =
        useState([]);
    useEffect(() => {
        fetchStats();
        fetchReports();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch(
                "https://safepath-hackhazard-project.onrender.com/api/reports/stats"
            );

            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await fetch(
                "https://safepath-hackhazard-project.onrender.com/api/reports"
            );

            const data = await res.json();
            setRecentReports(data);
        } catch (err) {
            console.error(err);
        }
    };

    const incidents = [
        {
            name: "Accident",
            icon: <Car size={34} />,
        },
        {
            name: "Fire",
            icon: <Flame size={34} />,
        },
        {
            name: "Medical Emergency",
            icon: <Ambulance size={34} />,
        },
        {
            name: "Crime",
            icon: <ShieldAlert size={34} />,
        },
        {
            name: "Flood",
            icon: <Waves size={34} />,
        },
        {
            name: "Other",
            icon: <AlertTriangle size={34} />,
        },
    ];

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     console.log({
    //         incidentType,
    //         description,
    //         location,
    //         severity,
    //         anonymous,
    //         image,
    //     });

    //     setSubmitted(true);
    // };

    const sendReport = async (e) => {
        e.preventDefault();

        const reportData = {
            incidentType,
            description,
            location,
            severity,
            anonymous,
        };

        try {
            const response = await fetch(
                "https://safepath-hackhazard-project.onrender.com/api/reports",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(reportData),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to submit report"
                );
            }

            setSubmitted(true);

            fetchStats();
            fetchReports();
        } catch (error) {
            console.error(
                "Error submitting report:",
                error
            );
        }
    };

    return (
        <div className="report-container">
            <PageHeader />
            <div className="report-content">

                {/* Hero */}

                <div className="report-hero">
                    <div className="hero-icon">
                        <AlertTriangle size={42} />
                    </div>

                    <h1>Report an Incident</h1>

                    <p>
                        Help nearby people, volunteers and
                        emergency responders act faster by
                        reporting hazards in real time.
                    </p>
                </div>

                {/* Community Activity */}

                <div className="community-section">
                    <h2>Live Community Activity</h2>

                    <div className="community-grid">
                        <div className="community-card">
                            <Car size={28} />
                            <h3>{stats.Accident}</h3>
                            <p>Accidents</p>
                        </div>

                        <div className="community-card">
                            <Flame size={28} />
                            <h3>{stats.Fire}</h3>
                            <p>Fires</p>
                        </div>

                        <div className="community-card">
                            <Ambulance size={28} />
                            <h3>{stats["Medical Emergency"]}</h3>
                            <p>Medical</p>
                        </div>

                        <div className="community-card">
                            <ShieldAlert size={28} />
                            <h3>{stats.Crime}</h3>
                            <p>Crime</p>
                        </div>

                        <div className="community-card">
                            < Waves size={28} />
                            <h3>{stats.Flood}</h3>
                            <p>Flood</p>
                        </div>

                        <div className="community-card">
                            <MapPin size={28} />
                            <h3>{stats.Other}</h3>
                            <p>Other</p>
                        </div>

                    </div>
                </div>
                <div className="section-card">
                    <h2 className="section-title">
                        Recent Reports
                    </h2>

                    {recentReports
                        .slice(0, 5)
                        .map((report) => (
                            <div
                                key={report.id}
                                style={{
                                    marginBottom: "10px",
                                    padding: "12px",
                                    border:
                                        "1px solid #2a3b52",
                                    borderRadius: "10px",
                                }}
                            >
                                <h4>
                                    {report.code} -{" "}
                                    {report.incidentType}
                                </h4>

                                <p>
                                    Severity:{" "}
                                    {report.severity}
                                </p>

                                <p>
                                    Status: {report.status}
                                </p>
                            </div>
                        ))}
                </div>
                <form
                    className="report-form"
                    onSubmit={sendReport}
                >
                    {/* Incident Type */}
                    <div className="section-card">
                        <h2 className="section-title">
                            Select Incident Type
                        </h2>

                        <div className="incident-grid">
                            {incidents.map((item) => (
                                <div
                                    key={item.name}
                                    className={`incident-card ${incidentType === item.name
                                        ? "selected"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setIncidentType(item.name)
                                    }
                                >
                                    <div className="incident-icon">
                                        {item.icon}
                                    </div>

                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="section-card">



                        <h2 className="section-title">
                            Location
                        </h2>

                        <button
                            type="button"
                            className="location-btn"
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        setLocation(
                                            `${position.coords.latitude.toFixed(
                                                6
                                            )}, ${position.coords.longitude.toFixed(
                                                6
                                            )}`
                                        );
                                    }
                                );
                            }}
                        >
                            <MapPin size={18} />
                            Use Current Location
                        </button>

                        {location && (
                            <div className="location-preview">
                                <MapPin size={18} />

                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                    <div className="section-card">


                        <h2 className="section-title">
                            Description
                        </h2>

                        <textarea
                            rows={6}
                            maxLength={500}
                            placeholder="Describe what happened..."
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <div className="char-count">
                            {description.length}/500
                        </div>
                    </div>
                    <div className="section-card">

                        {/* Upload Section */}

                        <h2 className="section-title">Upload Evidence</h2>

                        <label className="upload-box">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                            />

                            <div className="upload-content">
                                <div className="upload-icon">📷</div>

                                <h3>Upload Photo</h3>

                                <p>
                                    Tap here to attach an image of the
                                    incident
                                </p>
                            </div>
                        </label>

                        {image && (
                            <div className="image-preview-card">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="preview-image"
                                />

                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={() => setImage(null)}
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="section-card">

                        {/* Severity */}

                        <h2 className="section-title">
                            Severity Level
                        </h2>

                        <div className="severity-row">
                            <button
                                type="button"
                                className={`severity-btn ${severity === "Low" ? "selected" : ""
                                    }`}
                                onClick={() => setSeverity("Low")}
                            >
                                🟢 Low
                            </button>

                            <button
                                type="button"
                                className={`severity-btn ${severity === "Medium"
                                    ? "selected"
                                    : ""
                                    }`}
                                onClick={() => setSeverity("Medium")}
                            >
                                🟡 Medium
                            </button>

                            <button
                                type="button"
                                className={`severity-btn ${severity === "High" ? "selected" : ""
                                    }`}
                                onClick={() => setSeverity("High")}
                            >
                                🔴 High
                            </button>
                        </div>
                    </div>
                    <div className="section-card">

                        {/* Anonymous */}

                        <div className="anonymous-card">
                            <div>
                                <h3>Anonymous Report</h3>

                                <p>
                                    Hide your identity while submitting
                                    this report.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={anonymous}
                                onChange={() =>
                                    setAnonymous(!anonymous)
                                }
                            />
                        </div>
                    </div>



                    <button
                        className="submit-report-btn"
                        type="submit"
                    >
                        🚨 Submit Report
                    </button>

                </form>
                {submitted && (
                    <div className="success-overlay">
                        <div className="success-modal">

                            <div className="success-check">
                                ✅
                            </div>

                            <h2>Report Submitted</h2>

                            <p>
                                Thank you for helping keep your
                                community safe.
                            </p>

                            <div className="report-id-card">
                                <span>Report ID</span>

                                <strong>
                                    SR-
                                    {Math.floor(
                                        1000 + Math.random() * 9000
                                    )}
                                </strong>
                            </div>

                            <div className="success-status">

                                <p>📍 Location Verified</p>

                                <p>👮 Authorities Notified</p>

                                <p>🤝 Nearby Volunteers Alerted</p>

                                <p>🚧 Status: Under Review</p>

                            </div>

                            <button
                                className="done-btn"
                                onClick={() => {
                                    setSubmitted(false);

                                    setIncidentType("");
                                    setDescription("");
                                    setLocation("");
                                    setImage(null);
                                    setSeverity("Medium");
                                    setAnonymous(false);
                                }}
                            >
                                Done
                            </button>

                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}

export default Report;