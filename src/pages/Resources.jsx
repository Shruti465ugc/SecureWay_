import { useState } from "react";
import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";
import "../styles/Resources.css";

import {
  Shield,
  Flame,
 HeartPulse,
  PhoneCall,
  TriangleAlert,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function Resources() {
  const [openGuide, setOpenGuide] = useState(null);

 

  const emergencyContacts = [
    {
      title: "Police",
      number: "112",
      icon: <Shield size={34} />,
    },
    {
      title: "Ambulance",
      number: "108",
      icon: <HeartPulse size={34} />,
    },
    {
      title: "Fire Brigade",
      number: "101",
      icon: <Flame size={34} />,
    },
    {
      title: "Women Helpline",
      number: "1091",
      icon: <PhoneCall size={34} />,
    },
    {
      title: "Disaster Response",
      number: "108",
      icon: <TriangleAlert size={34} />,
    },
    {
      title: "National Emergency",
      number: "112",
      icon: <Shield size={34} />,
    },
  ];

 

  const guides = [
    {
      title: "First Aid",
      icon: "🩹",
      content: [
        "Stay calm and assess the situation.",
        "Call emergency services immediately.",
        "Stop bleeding using clean cloth.",
        "Keep the injured person comfortable.",
        "Do not move seriously injured victims unnecessarily.",
      ],
    },

    {
      title: "Fire Safety",
      icon: "🔥",
      content: [
        "Stay low to avoid smoke.",
        "Do not use elevators.",
        "Evacuate immediately.",
        "Call the fire department.",
        "Never go back inside a burning building.",
      ],
    },

    {
      title: "Road Accident",
      icon: "🚗",
      content: [
        "Ensure your own safety first.",
        "Call emergency services.",
        "Turn on hazard lights.",
        "Do not move victims with spinal injuries.",
        "Provide first aid only if trained.",
      ],
    },

    {
      title: "Flood Safety",
      icon: "🌊",
      content: [
        "Move to higher ground.",
        "Avoid walking through flood water.",
        "Stay away from electric poles.",
        "Follow official advisories.",
        "Keep emergency supplies ready.",
      ],
    },

    {
      title: "Earthquake",
      icon: "🌍",
      content: [
        "Drop, Cover and Hold.",
        "Stay away from windows.",
        "Do not use elevators.",
        "Move to open space after shaking stops.",
        "Expect aftershocks.",
      ],
    },
  ];

  return (
    <div className="resources-container">
      <PageHeader />

  

      <section className="resources-hero">
        <div className="hero-badge">
          <Shield size={18} />
          SafeRoute Emergency Hub
        </div>

        <h1>Emergency Resources</h1>

        <p>
          Quick access to emergency contacts,
          safety guides and life-saving
          information when every second matters.
        </p>
      </section>

     

      <section className="resource-section">
        <div className="section-heading">
          <PhoneCall size={22} />
          <h2>Quick Emergency Calls</h2>
        </div>

        <div className="resource-grid">
          {emergencyContacts.map((item) => (
            <a
              key={item.title}
              href={`tel:${item.number}`}
              className="resource-card"
            >
              <div className="resource-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <h4>{item.number}</h4>

              <span>Tap to Call</span>
            </a>
          ))}
        </div>
      </section>

     

      <section className="resource-section">

        <div className="section-heading">
          <BookOpen size={22} />
          <h2>Emergency Guides</h2>
        </div>

        <div className="guide-list">

          {guides.map((guide, index) => (

            <div
              key={index}
              className="guide-card"
            >
              <div
                className="guide-header"
                onClick={() =>
                  setOpenGuide(
                    openGuide === index
                      ? null
                      : index
                  )
                }
              >
                <div className="guide-title">

                  <span className="guide-emoji">
                    {guide.icon}
                  </span>

                  <h3>{guide.title}</h3>

                </div>

                {openGuide === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {openGuide === index && (
                <div className="guide-content">

                  {guide.content.map(
                    (item, i) => (
                      <p key={i}>
                        ✓ {item}
                      </p>
                    )
                  )}

                </div>
              )}
            </div>

          ))}

        </div>

      </section>

           

      <section className="resource-section">
        <div className="section-heading">
          <BookOpen size={22} />
          <h2>Emergency Kit Checklist</h2>
        </div>

        <div className="kit-grid">
          <div className="kit-item">💧 Water Bottle</div>
          <div className="kit-item">🔦 Flashlight</div>
          <div className="kit-item">🔋 Power Bank</div>
          <div className="kit-item">🥫 Dry Food</div>
          <div className="kit-item">💊 Medicines</div>
          <div className="kit-item">🩹 First Aid Kit</div>
          <div className="kit-item">📱 Phone Charger</div>
          <div className="kit-item">📄 Important Documents</div>
        </div>
      </section>

      

      <section className="resource-section">
        <div className="section-heading">
          <Shield size={22} />
          <h2>Find Nearby Help</h2>
        </div>

        <div className="nearby-grid">
          <div className="nearby-card">
            <div className="nearby-icon">🏥</div>
            <h3>Hospitals</h3>
            <p>Find the nearest hospital</p>
          </div>

          <div className="nearby-card">
            <div className="nearby-icon">🚓</div>
            <h3>Police Stations</h3>
            <p>Locate nearby police help</p>
          </div>

          <div className="nearby-card">
            <div className="nearby-icon">🚒</div>
            <h3>Fire Stations</h3>
            <p>Emergency fire response</p>
          </div>

          <div className="nearby-card">
            <div className="nearby-icon">🏠</div>
            <h3>Relief Shelters</h3>
            <p>Safe shelter locations</p>
          </div>
        </div>
      </section>

     

      <section className="resource-section">
        <div className="tip-card">
          <div className="tip-title">
            💡 Safety Tip of the Day
          </div>

          <p>
            During a fire, stay low to avoid smoke
            inhalation and never use elevators.
            Exit the building immediately and call
            emergency services from a safe location.
          </p>
        </div>
      </section>

      

      <section className="resource-section">
        <div className="volunteer-card">
          <h2>🤝 Become a Volunteer</h2>

          <p>
            Join the SafeRoute volunteer network
            and help your community during
            emergencies and disasters.
          </p>

          <button className="volunteer-btn">
            Register as Volunteer
          </button>
        </div>
      </section>

      

      <section className="footer-card">
        <h3>SafeRoute</h3>

        <p>
          Empowering communities through faster
          emergency response and real-time
          volunteer coordination.
        </p>
      </section>

      <BottomNav />
    </div>
  );
}

export default Resources;
