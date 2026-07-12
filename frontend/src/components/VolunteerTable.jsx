import { useEffect, useState } from "react";
import "../styles/VolunteerTable.css";

function VolunteerTable() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {

    const res = await fetch(
      "https://safepath-hackhazard-project.onrender.com/api/volunteers/pending"
    );

    const data = await res.json();

    setApplications(data);
  };

  const approveVolunteer = async (id) => {

    await fetch(
      `https://safepath-hackhazard-project.onrender.com/api/volunteers/approve/${id}`,
      {
        method: "PUT",
      }
    );

    loadApplications();
  };

  const rejectVolunteer = async (id) => {

    await fetch(
      `https://safepath-hackhazard-project.onrender.com/api/volunteers/reject/${id}`,
      {
        method: "DELETE",
      }
    );

    loadApplications();
  };

  return (
    <div className="volunteer-table">

      <h2>Pending Volunteer Applications</h2>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Skill</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {applications.length === 0 ? (

            <tr>

              <td colSpan="5">
                No Pending Applications
              </td>

            </tr>

          ) : (

            applications.map((volunteer) => (

              <tr key={volunteer._id}>

                <td>{volunteer.user?.name}</td>

                <td>{volunteer.user?.email}</td>

                <td>{volunteer.phone}</td>

                <td>{volunteer.skill}</td>

                <td>

                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveVolunteer(volunteer._id)
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      rejectVolunteer(volunteer._id)
                    }
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default VolunteerTable;