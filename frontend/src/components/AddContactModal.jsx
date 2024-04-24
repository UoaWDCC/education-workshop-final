/* eslint-disable react/prop-types */
import styles from "./Form.module.css";
import { ActionButton } from "./ActionButton";
import Modal from "./Modal";
import { useState } from "react";

/**
 * A modal dialog allowing users to add contacts.
 */
export default function AddContactModal({ visible, onClose, onAddContact }) {
  // Use bound inputs
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [funFact, setFunFact] = useState("");

  // Raises the onAddContact event when the form is submitted.
  function handleSubmit(e) {
    e.preventDefault();
    onAddContact(name, phoneNumber, funFact);
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.header}>Add Contact</h3>

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

          <ActionButton type="submit" text="Add Contact" />
        </form>
      </div>
    </Modal>
  );
}
