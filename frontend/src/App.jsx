import { FriendDisplay } from "./components/FriendDisplay";
import Sidebar from "./components/Sidebar";
import { AddContact } from "./components/AddContact";
import { useEffect, useState } from "react";
import { EditContact } from "./components/EditContact";

export default function App() {
  // Array of contacts (replace with your own data)
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
  const [editContactModalOpen, setEditContactModalOpen] = useState(false);

  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    const res = await fetch("http://localhost:3000/api/contact");
    const data = await res.json();
    setContacts(data);
    setIsLoadingContacts(false);
    setSelectedContact(data[0]);
  };

  // Fetch contacts on mount
  useEffect(() => {
    // Initial fetch
    fetchContacts();

    // Setup refetch
    const fiveMinutes = 1000 * 60 * 5;
    const refetchData = setInterval(fetchContacts, fiveMinutes);
    return () => clearInterval(refetchData);
  }, []);

  const addContact = async (name, phoneNumber, funFact) => {
    const tempContacts = contacts;
    setContacts([
      ...contacts,
      {
        name,
        phoneNumber,
        funFact
      }
    ]);
    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        }),
        headers: { "content-type": "application/json" }
      });
      const data = await res.json();
      const updatedContacts = [...tempContacts, data];
      setContacts(updatedContacts);
      setSelectedContact(data);
      console.log(`updatedContacts = ${updatedContacts.map(JSON.stringify)}`);
    } catch (err) {
      setContacts(tempContacts);
    }
  };

  const deleteContact = async (name, phoneNumber, funFact) => {
    const tempContacts = contacts;
    const tempSelectedContact = selectedContact;
    setContacts([...contacts.filter((element) => element.name !== name)]);
    setSelectedContact(contacts[0]);
    try {
      await fetch("http://localhost:3000/api/contact", {
        method: "DELETE",
        body: JSON.stringify({
          name
        }),
        headers: { "content-type": "application/json" }
      });
    } catch (err) {
      setContacts(tempContacts);
      setSelectedContact(tempSelectedContact);
    }
  };

  const editContact = async (name, newName, phoneNumber, funFact, photoUrl) => {
    const tempContacts = contacts;
    const tempSelectedContact = selectedContact;
    // Optimistic updates
    setSelectedContact({ name: newName, phoneNumber, funFact, photoUrl });
    setContacts(
      contacts.map((element) => {
        if (element.name == name) {
          return {
            name: newName || element.name,
            phoneNumber: phoneNumber || element.phoneNumber,
            funFact: funFact || element.funFact,
            photoUrl: element.photoUrl
          };
        } else {
          return element;
        }
      })
    );
    try {
      await fetch("http://localhost:3000/api/contact", {
        method: "PATCH",
        body: JSON.stringify({
          newName,
          name,
          phoneNumber,
          funFact
        }),
        headers: { "content-type": "application/json" }
      });
    } catch (err) {
      setContacts(tempContacts);
      setSelectedContact(tempSelectedContact);
    }
  };
  return (
    <>
      <div className="main">
        <Sidebar
          contacts={contacts}
          addContact={addContact}
          deleteContact={deleteContact}
          editContact={editContact}
          isLoading={isLoadingContacts}
          setSelectedContact={setSelectedContact}
          setModalOpen={setAddContactModalOpen}
        />
        {contacts.length && (
          <FriendDisplay
            friend={selectedContact}
            openEditModal={setEditContactModalOpen}
            onDelete={() => deleteContact(selectedContact.name)}
          />
        )}
      </div>
      <AddContact
        visible={addContactModalOpen}
        addContact={addContact}
        setVisible={setAddContactModalOpen}
      />
      <EditContact
        visible={editContactModalOpen}
        editContact={editContact}
        setVisible={setEditContactModalOpen}
        contact={selectedContact}
        deleteContact={deleteContact}
      />
    </>
  );
}
