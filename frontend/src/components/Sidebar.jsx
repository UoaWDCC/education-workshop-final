import React, { useState } from "react";
import ContactCard from "./ContactCard";
import styles from "./Sidebar.module.css";

const Sidebar = ({ contacts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter contacts based on search term
  const filterContacts = (contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Array of contacts (replace with your own data)
  //   const contacts = [
  //     { name: "John Doe", phone: "123-456-7890" },
  //     { name: "Jane Smith", phone: "987-654-3210" },
  //     { name: "Bob Johnson", phone: "555-555-5555" },
  //     { name: "John Doe", phone: "123-456-7890" },
  //     { name: "Jane Smith", phone: "987-654-3210" },
  //     { name: "Bob Johnson", phone: "555-555-5555" },
  //     { name: "John Doe", phone: "123-456-7890" },
  //     { name: "Jane Smith", phone: "987-654-3210" },
  //     { name: "Bob Johnson", phone: "555-555-5555" },
  //     { name: "John Doe", phone: "123-456-7890" },
  //     { name: "Jane Smith", phone: "987-654-3210" },
  //     { name: "Bob Johnson", phone: "555-555-5555" },
  //     { name: "John Doe", phone: "123-456-7890" },
  //     { name: "Jane Smith", phone: "987-654-3210" },
  //     { name: "Bob Johnson", phone: "555-555-5555" }
  //   ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.corner}>
        <h2>Friends</h2>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className={styles.contactList}>
        {contacts.filter(filterContacts).map((contact, index) => (
          <ContactCard contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
