/* eslint-disable react/prop-types */
import styles from "./ContactCard.module.css";

const ContactCard = ({ contact, setSelectedContact }) => {
  return (
    <div className={styles.card} onClick={() => setSelectedContact(contact)}>
      <img
        src={
          contact?.photoUrl ||
          "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain"
        }
        alt={contact?.name}
      />
      <h2>{contact?.name || ""}</h2>
    </div>
  );
};

export default ContactCard;
