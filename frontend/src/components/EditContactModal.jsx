/* eslint-disable react/prop-types */
import styles from "./Form.module.css";
import Modal from "./Modal";
import { ActionButton, RedActionButton } from "./ActionButton";
import { useEffect, useState } from "react";

/**
 * A modal dialog allowing users to edit details of existing contacts.
 */
export default function EditContactModal({
  visible,
  onClose,
  onEditContact,
  contact,
  onDeleteContact
}) {
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

  // Raises the onEditContact event when the form is submitted.
  function handleSubmit(e) {
    e.preventDefault();
    onEditContact({ ...contact, name, phoneNumber, funFact });
    onClose();
  }

  // Raises the onDeleteContact event when the delete button is clicked.
  function handleDelete() {
    onDeleteContact(contact._id);
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.header}>Edit Contact</h3>

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
            <label htmlFor="funFact">Fun fact</label>
            <textarea
              id="funFact"
              rows={4}
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              gap: "1rem",
              padding: 0
            }}
          >
            <ActionButton type="submit" text="Save" />
            <RedActionButton text="Delete" onClick={handleDelete} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
