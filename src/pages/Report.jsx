import { useState } from "react";
import "../styles/Report.css";
import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";

function Report() {
    const [incidentType, setIncidentType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        console.log({
            incidentType,
            description,
            location,
        });

        setIncidentType("");
        setDescription("");
        setLocation("");
    };

    return (
        <div className="report-container">
            <PageHeader />
            <h1>Report Incident</h1>
            {submitted && (
                <div className="success-message">
                    Report submitted successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="report-form">

                <label>Incident Type</label>

                <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                >
                    <option value="">Select Incident</option>
                    <option value="Accident">Accident</option>
                    <option value="Fire">Fire</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Crime">Crime</option>
                    <option value="Other">Other</option>
                </select>

                <label>Description</label>

                <textarea
                    rows="5"
                    placeholder="Describe the incident..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Location</label>

                <button
                    type="button"
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition((position) => {
                            setLocation(
                                `${position.coords.latitude}, ${position.coords.longitude}`
                            );
                        });
                    }}
                >
                    Use Current Location
                </button>

                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Upload Image</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="preview-image"
                    />
                )}

                <button type="submit">
                    Submit Report
                </button>

            </form>
            <BottomNav />
        </div>
    );
}

export default Report;