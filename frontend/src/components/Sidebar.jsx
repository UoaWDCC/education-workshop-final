import React, { useState } from "react";
import ContactCard from "./ContactCard";
import styles from "./Sidebar.module.css";

const Sidebar = ({ contacts, setSelectedContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter contacts based on search term
  const filterContacts = (contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  };


  return (
    <div className={styles.sidebar}>
      <div className={styles.corner}>
        <h2>Friends</h2>
        <input
          className={styles.searchbar}
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className={styles.contactList}>
        {contacts.filter(filterContacts).map((contact, index) => (
          <ContactCard key={index} contact={contact} setSelectedContact={setSelectedContact} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
