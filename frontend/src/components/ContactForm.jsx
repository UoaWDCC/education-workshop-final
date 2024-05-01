import styles from "./ContactForm.module.css";
import { useState, useEffect } from "react";
import { ActionButton, RedActionButton } from "./ActionButton";

export default function ContactForm({ title, contact, onSubmit, hasDeleteButton, onDelete }) {
  // Use bound inputs
  const [name, setName] = useState(contact?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber ?? "");
  const [funFact, setFunFact] = useState(contact?.funFact ?? "");

  // Whenever the contact prop changes, update the bound inputs to match.
  useEffect(() => {
    setName(contact?.name ?? "");
    setPhoneNumber(contact?.phoneNumber ?? "");
    setFunFact(contact?.funFact ?? "");
  }, [contact?._id]);

  // Raises the onSubmit event when the form is submitted.
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, phoneNumber, funFact);
  }

  // Raises the onDelete event when the delete button is clicked.
  function handleDelete(e) {
    e.preventDefault();
    onDelete(contact);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{title}</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="funfact">Fun fact</label>
          <textarea
            id="funFact"
            rows={4}
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
          />
        </div>

        <div className={styles.buttonDiv}>
          <ActionButton type="submit" text="Save" />
          {hasDeleteButton ? <RedActionButton text="Delete" onClick={handleDelete} /> : undefined}
        </div>
      </form>
    </div>
  );
}
