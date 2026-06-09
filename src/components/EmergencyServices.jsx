import "../styles/EmergencyServices.css";

function EmergencyServices({
  selectedEmergency,
  setSelectedEmergency,
}) {
  const services = ["Police", "Fire", "Ambulance"];

  return (
    <div className="services-container">
      {services.map((service) => (
        <div
          key={service}
          className={`service-card ${
            selectedEmergency === service ? "active" : ""
          }`}
          onClick={() => setSelectedEmergency(service)}
        >
          <h3>
            {service === "Police" && "🚓"}
            {service === "Fire" && "🚒"}
            {service === "Ambulance" && "🚑"}{" "}
            {service}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default EmergencyServices;