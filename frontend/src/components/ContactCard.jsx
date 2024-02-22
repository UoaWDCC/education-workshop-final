import React from "react";
import styles from "./ContactCard.module.css";

const ContactCard = ({ contact }) => {
  return (
    <div className={styles.card}>
      <img src={contact.photoUrl || ""} alt={contact.name} />
      <h2>{contact.name || ""}</h2>
      <p>{contact.phoneNumber || ""}</p>
      <p>{contact.funFact || ""}</p>
    </div>
  );
};

export default ContactCard;
