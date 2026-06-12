import "../styles/EmergencyContacts.css";

function EmergencyContacts() {
  const contacts = [
    {
      name: "Amit",
      phone: "+91 98765 43210",
    },
    {
      name: "Sneha",
      phone: "+91 98765 12345",
    },
  ];

  return (
    <div className="contacts-card">
      <h3>👨‍👩‍👧 Trusted Contacts</h3>

      {contacts.map((contact, index) => (
        <div className="contact-row" key={index}>
          <div>
            <strong>{contact.name}</strong>
            <p>{contact.phone}</p>
          </div>

          <button>📞</button>
        </div>
      ))}

      <button className="add-contact">
        + Add Contact
      </button>
    </div>
  );
}

export default EmergencyContacts;