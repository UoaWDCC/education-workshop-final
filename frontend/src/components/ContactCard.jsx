import React from "react";
import styles from "./ContactCard.module.css";

const ContactCard = ({ contact }) => {
  return (
    <div className={styles.card}>
      {contact.photoUrl ? <img src={contact.photoUrl || ""} alt={contact.name} /> : <div class={styles.placeholder}></div>}
      
      <h2>{contact.name || ""}</h2>
      {/* <p>{contact.phoneNumber || ""}</p>
      <p>{contact.funFact || ""}</p> */}
    </div>
  );
};

export default ContactCard;
