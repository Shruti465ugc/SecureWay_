import "../styles/StatsCard.css";

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="stats-card">

      <div
        className="stats-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stats-info">

        <h2>{value}</h2>

        <p>{title}</p>

      </div>

    </div>
  );
}

export default StatsCard;