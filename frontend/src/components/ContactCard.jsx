import React from 'react';
import styles from './ContactCard.module.css';

const ContactCard = ({ photoUrl, name }) => {
  return (
    <div className={styles.card}>
        <img src={photoUrl} alt={name} />  
        <h2>{name}</h2>
    </div>
  );
};

export default ContactCard;
