import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";
import "../styles/Resources.css";

function Resources() {
  const resources = [
    {
      title: "Police",
      number: "112",
      icon: "🚓",
    },
    {
      title: "Ambulance",
      number: "108",
      icon: "🚑",
    },
    {
      title: "Fire Brigade",
      number: "101",
      icon: "🚒",
    },
    {
      title: "Women Helpline",
      number: "1091",
      icon: "👩",
    },
    {
      title: "Disaster Management",
      number: "108",
      icon: "⚠️",
    },
  ];

  return (
    <div className="resources-container">
      <PageHeader />
      <h1>Emergency Resources</h1>

      {resources.map((resource, index) => (
        <div key={index} className="resource-card">
          <span className="resource-icon">
            {resource.icon}
          </span>

          <div>
            <h3>{resource.title}</h3>
            <a href={`tel:${resource.number}`}>
              {resource.number}
            </a>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  );
}

export default Resources;