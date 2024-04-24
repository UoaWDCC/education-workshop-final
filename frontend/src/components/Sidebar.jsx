/* eslint-disable react/prop-types */
import { useState } from "react";
import ContactCard from "./ContactCard";
import styles from "./Sidebar.module.css";
import AddContactCard from "./AddContactCard";

/**
 * A sidebar with links to view each contact, or add new contacts.
 *
 * The contacts list can be filtered by name.
 */
export default function Sidebar({
  contacts,
  selectedContact,
  onContactClicked,
  onAddContactClicked
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter contacts based on search term
  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <nav className={styles.sidebar}>
      <div className={styles.corner}>
        <h2>Friends</h2>
        <input
          className={styles.searchbar}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.contactList}>
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            isActive={contact === selectedContact}
            onContactClicked={onContactClicked}
          />
        ))}
      </div>
      <AddContactCard onClick={onAddContactClicked} />
    </nav>
  );
}
