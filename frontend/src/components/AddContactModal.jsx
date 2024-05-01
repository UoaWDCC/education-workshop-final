/* eslint-disable react/prop-types */
import Modal from "./Modal";
import ContactForm from "./ContactForm";

/**
 * A modal dialog allowing users to add contacts.
 */
export default function AddContactModal({ visible, onClose, onAddContact }) {
  // Raises the onAddContact event when the form is submitted.
  function handleSubmit(name, phoneNumber, funFact) {
    onAddContact(name, phoneNumber, funFact);
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <ContactForm title="Add Contact" onSubmit={handleSubmit} />
    </Modal>
  );
}
