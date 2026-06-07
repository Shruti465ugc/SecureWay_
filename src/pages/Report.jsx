import { useState } from "react";
import "../styles/Report.css";

function Report() {
    const [incidentType, setIncidentType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Report Submitted!");

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
            <h1>Report Incident</h1>

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
        </div>
    );
}

export default Report;