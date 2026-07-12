import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://safepath-hackhazard-project.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("LOGIN RESPONSE:", data);
console.log("USER:", data.user);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // Save JWT
    localStorage.setItem("token", data.token);

    // Save User
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

 // Admin
if (data.user.role === "admin") {
  navigate("/admin/applications");
  return;
}

// Volunteer
// First check admin
if (data.user.role === "admin") {
  navigate("/admin/applications");
  return;
}

// Then check volunteer
const volunteerRes = await fetch(
  `https://safepath-hackhazard-project.onrender.com/api/volunteers/me/${data.user.id}`
);

if (volunteerRes.ok) {
  navigate("/volunteer-dashboard");
} else {
  navigate("/dashboard");
}

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">SafePath</h1>
        <p className="auth-subtitle">Welcome Back</p>

      <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;