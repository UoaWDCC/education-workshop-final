import { FriendDisplay } from "./components/FriendDisplay";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

export default function App() {
  // Array of contacts (replace with your own data)
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    const res = await fetch("http://localhost:3000/api/contact");
    const data = await res.json();
    setContacts(data);
    setIsLoadingContacts(false);
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
      await fetch("http://localhost:3000/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        })
      });
    } catch (err) {
      setContacts(tempContacts);
    }
  };

  const deleteContact = async (name, phoneNumber, funFact) => {
    const tempContacts = contacts;
    setContacts([...contacts.filter((element) => element.name !== name)]);
    try {
      await fetch("http://localhost:3000/contact", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        })
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
    try {
      await fetch("http://localhost:3000/contact", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          phoneNumber,
          funFact
        })
      });
    } catch (err) {
      setContacts(tempContacts);
    }
  };
  return (
    <div class="main">
      <Sidebar
        contacts={contacts}
        addContact={addContact}
        deleteContact={deleteContact}
        editContact={editContact}
        isLoading={isLoadingContacts}
        setSelectedContact={setSelectedContact}
      />
      {contacts.length && <FriendDisplay friend={selectedContact}/>}
    </div>
  );
}