import "../styles/EmergencyServices.css";

function EmergencyServices({
  selectedEmergency,
  setSelectedEmergency,
}) {
  const services = [
    { id: 1, name: "Police", icon: "🚓" },
    { id: 2, name: "Fire", icon: "🚒" },
    { id: 3, name: "Ambulance", icon: "🚑" },
    { id: 4, name: "Women Safety", icon: "🛡️" },
    { id: 5, name: "Flood", icon: "🌊" },
    { id: 6, name: "Other", icon: "🆘" },
  ];

  return (
    <div className="services-container">
      {services.map((service) => (
        <div
          key={service.id}
          className={`service-card ${
            selectedEmergency?.id === service.id ? "active" : ""
          }`}
          onClick={() => setSelectedEmergency(service)}
        >
          <h3>
            {service.icon} {service.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default EmergencyServices;