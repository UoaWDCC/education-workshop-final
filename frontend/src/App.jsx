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
      await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        }),
        headers: {'content-type': 'application/json'},
      });
    } catch (err) {
      setContacts(tempContacts);
    }
  };

  const deleteContact = async (name, phoneNumber, funFact) => {
    const tempContacts = contacts;
    setContacts([...contacts.filter((element) => element.name !== name)]);
    try {
      await fetch("http://localhost:3000/api/contact", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        }),
        headers: {'content-type': 'application/json'},
      });
    } catch (err) {
      setContacts(tempContacts);
    }
  };

  const editContact = async (name, phoneNumber, funFact) => {
    const tempContacts = contacts;
    // Optimistic updates
    setContacts([
      ...contacts.map((element) => {
        if (element.name == name) {
          return {
            name,
            phoneNumber: phoneNumber || element.phoneNumber,
            funFact: funFact || element.funFact
          };
        } else {
          return element;
        }
      })
    ]);
    setSelectedContact({name, phoneNumber, funFact});
    try {
      await fetch("http://localhost:3000/api/contact", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        }), 
        headers: {'content-type': 'application/json'},
      });
    } catch (err) {
      setContacts(tempContacts);
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
      {contacts.length && <FriendDisplay friend={selectedContact} openEditModal={setEditContactModalOpen}/>}
    </div>
    <AddContact visible={addContactModalOpen} addContact={addContact} setVisible={setAddContactModalOpen} />
    <EditContact visible={editContactModalOpen} editContact={editContact} setVisible={setEditContactModalOpen} contact={selectedContact}/>
    </>
  );
}