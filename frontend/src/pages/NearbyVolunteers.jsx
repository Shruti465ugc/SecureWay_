import { useEffect, useState } from "react";
import "../styles/NearbyVolunteers.css";
import { useNavigate } from "react-router-dom";

function NearbyVolunteers() {
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNearbyVolunteers();
    }, []);

    const fetchNearbyVolunteers = async () => {
        try {
            setLoading(true);

            // Get user location
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const res = await fetch(
                    `https://SecureWay_-hackhazard-project.onrender.com/api/volunteers/nearby?lat=${lat}&lon=${lon}&radius=5`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch volunteers");
                }

                setVolunteers(data);
                setError(null);
            },
            (err) => {
                setError("Location permission denied");
                setLoading(false);
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="volunteer-section">
                <h3>🤝 Nearby Volunteers</h3>
                <p>Loading volunteers...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="volunteer-section">
                <h3>🤝 Nearby Volunteers</h3>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="volunteer-section">
            <h3>🤝 Nearby Volunteers</h3>

            {volunteers.length === 0 ? (
                <p>No volunteers found nearby</p>
            ) : (
                volunteers.map((volunteer) => (
                    <div className="volunteer-row" key={volunteer.id}>
                        <span>🟢 {volunteer.name}</span>
                        <span>{volunteer.distanceKm} km</span>
                    </div>
                ))
            )}

           <button
  className="view-map-btn"
  onClick={() => navigate("/map")}
>
  📍 View Volunteers on Map
</button>
        </div>
    );
}

export default NearbyVolunteers;