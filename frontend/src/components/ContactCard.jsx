/* eslint-disable react/prop-types */
import styles from "./ContactCard.module.css";
import clsx from "clsx";

/**
 * A card / link to appear on the sidebar. When clicked, will allow the user to view
 * detailed info about that contact.
 */
export default function ContactCard({ contact, isActive, onContactClicked }) {
  return (
    <div
      className={clsx(styles.card, isActive && styles.active)}
      onClick={() => onContactClicked(contact)}
    >
      <img
        src={
          contact?.photoUrl ??
          "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain"
        }
        alt={contact?.name}
      />
      <h2>{contact?.name ?? ""}</h2>
    </div>
  );
}
