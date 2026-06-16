import "../styles/NearbyVolunteers.css";

function NearbyVolunteers() {
    const volunteers = [
        {
            name: "Rahul",
            distance: "0.8 km",
        },
        {
            name: "Priya",
            distance: "1.2 km",
        },
        {
            name: "Aman",
            distance: "2.0 km",
        },
    ];

    return (
        <div className="volunteer-section">
            <h3>🤝 Nearby Volunteers</h3>

            {volunteers.map((volunteer, index) => (
                <div className="volunteer-row" key={index}>
                    <span>🟢 {volunteer.name}</span>

                    <span>{volunteer.distance}</span>
                </div>
            ))}
            <button className="view-map-btn">
                📍 View Volunteers on Map
            </button>
        </div>
    );
}

export default NearbyVolunteers;