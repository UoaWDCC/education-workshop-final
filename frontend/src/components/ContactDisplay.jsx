import styles from "./ContactDisplay.module.css";
import { ActionButton, RedActionButton } from "./ActionButton";

const DEFAULT_IMG_SRC =
  "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain";

/* eslint-disable react/prop-types */
/**
 * The main application area; displays detailed info about a single contact.
 */
export default function ContactDisplay({ contact, onDeleteClick, onEditClick }) {
  if (!contact) return <div>No friend selected</div>;

  const { name, phoneNumber, funFact, photoUrl } = contact;
  return (
    <main className={styles.container}>
      <img src={photoUrl ?? DEFAULT_IMG_SRC} alt={`${name} portrait`} />
      <h1>{name}</h1>
      {phoneNumber && <h3>{phoneNumber}</h3>}
      {funFact && <p>Fun Fact: {funFact}</p>}
      <ActionButton text="Edit" onClick={onEditClick} />
      <RedActionButton text="Delete" onClick={onDeleteClick} />
    </main>
  );
}
