import React from "react";
import styles from "./ContactCard.module.css";

const ContactCard = ({ contact, setSelectedContact }) => {
  return (
    <div className={styles.card} onClick={() => setSelectedContact(contact)}>
      <img src={contact.photoUrl || ""} alt={contact.name} />
      <h2>{contact.name || ""}</h2>
      <p>{contact.phoneNumber || ""}</p>
      <p>{contact.funFact || ""}</p>
    </div>
  );
};

export default ContactCard;
