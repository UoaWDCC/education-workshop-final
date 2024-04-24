import styles from "./App.module.css";
import ContactDisplay from "./components/ContactDisplay";
import Sidebar from "./components/Sidebar";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";
import { useState } from "react";
import { useContacts } from "./hooks/useContacts.js";

export default function App() {
  const [isAddContactVisible, setAddContactVisible] = useState(false);
  const [isEditContactVisible, setEditContactVisible] = useState(false);

  const { contacts, selectedContact, setSelectedContact, addContact, deleteContact, editContact } =
    useContacts();

  return (
    <>
      <div className={styles.container}>
        {/* Sidebar (nav) */}
        <Sidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onAddContactClicked={() => setAddContactVisible(true)}
          onContactClicked={(contact) => setSelectedContact(contact)}
        />

        {/* Main area, displays detailed info about selected contact */}
        {contacts.length && (
          <ContactDisplay
            contact={selectedContact}
            onEditClick={() => setEditContactVisible(true)}
            onDeleteClick={() => deleteContact(selectedContact._id)}
          />
        )}
      </div>

      {/* Modal for adding new contacts */}
      <AddContactModal
        visible={isAddContactVisible}
        onAddContact={addContact}
        onClose={() => setAddContactVisible(false)}
      />

      {/* Modal for editing existing contacts */}
      <EditContactModal
        visible={isEditContactVisible}
        onEditContact={editContact}
        onClose={() => setEditContactVisible(false)}
        contact={selectedContact}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
