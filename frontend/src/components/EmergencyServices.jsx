import "../styles/EmergencyServices.css";

function EmergencyServices({
  selectedEmergency,
  setSelectedEmergency,
}) {
  const services = [
    { name: "Police", icon: "🚓" },
    { name: "Fire", icon: "🚒" },
    { name: "Ambulance", icon: "🚑" },
    { name: "Women Safety", icon: "🛡️" },
    { name: "Flood", icon: "🌊" },
    { name: "Other", icon: "🆘" },
  ];

  return (
    <div className="services-container">
      {services.map((service) => (
        <div
          key={service}
          className={`service-card ${selectedEmergency === service ? "active" : ""
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