import "../Styles/Home.css"
<Styles />

function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="logo">SafePath</h1>

        <img
          src="https://i.pravatar.cc/50"
          alt="profile"
          className="profile-pic"
        />
      </div>

      <div className="location-card">
        <p className="location-title">
          YOUR CURRENT LOCATION
        </p>

        <h2>Central Park West, NY</h2>

        <p>40.7812° N, 73.9665° W</p>
      </div>
    </div>
  );
}

export default Home;