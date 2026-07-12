import BottomNav from "./BottomNav";
import PageHeader from "./PageHeader";
import "../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setUser(loggedInUser);

    checkVolunteer(loggedInUser.id);
  }, []);

  const checkVolunteer = async (userId) => {
    try {
      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/volunteers/me/${userId}`
      );

      if (res.ok) {
        setIsVolunteer(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <PageHeader />

      <h1>My Profile</h1>

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h2>{user.name}</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <Link to="/edit-profile">
          <button className="edit-btn">
            Edit Profile
          </button>
        </Link>

        {isVolunteer && (
          <button
            className="edit-btn"
            onClick={() => navigate("/volunteer-dashboard")}
          >
            Volunteer Dashboard
          </button>
        )}

      </div>

      <BottomNav />
    </div>
  );
}

export default Profile;