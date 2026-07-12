import { useEffect, useState } from "react";
import "../styles/VolunteerApplicationsTable.css";

function VolunteerApplicationsTable() {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const res = await fetch(
        "https://safepath-hackhazard-project.onrender.com/api/admin/applications"
      );

      const data = await res.json();

      setApplications(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const approve = async (id) => {
    try {

      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/admin/approve/${id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      alert(data.message);

      loadApplications();

    } catch (err) {
      console.log(err);
    }
  };

  const reject = async (id) => {
    try {

      const res = await fetch(
        `https://safepath-hackhazard-project.onrender.com/api/admin/reject/${id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      alert(data.message);

      loadApplications();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="applications-section">

      <h2>Volunteer Applications</h2>

      <table className="applications-table">

       <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>City</th>
    <th>Skills</th>
    <th>Availability</th>
    <th>Experience</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>

          {applications.map((app) => (

         <tr key={app._id}>
  <td>{app.user?.name}</td>

  <td>{app.user?.email}</td>

  <td>{app.phone}</td>

  <td>{app.city}</td>

  <td>{app.skills}</td>

  <td>{app.availability}</td>

  <td>{app.experience}</td>

  <td>{app.status}</td>

  <td>
    {app.status === "Pending" && (
      <>
        <button onClick={() => approve(app._id)}>
          ✅ Approve
        </button>

        <button onClick={() => reject(app._id)}>
          ❌ Reject
        </button>
      </>
    )}
  </td>
</tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default VolunteerApplicationsTable;