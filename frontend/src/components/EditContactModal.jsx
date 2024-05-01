/* eslint-disable react/prop-types */
import Modal from "./Modal";
import ContactForm from "./ContactForm";

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
  // Raises the onEditContact event when the form is submitted.
  function handleSubmit(name, phoneNumber, funFact) {
    onEditContact({ ...contact, name, phoneNumber, funFact });
    onClose();
  }

  // Raises the onDeleteContact event when the delete button is clicked.
  function handleDelete(contact) {
    onDeleteContact(contact._id);
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <ContactForm
        title="Edit Contact"
        contact={contact}
        onSubmit={handleSubmit}
        hasDeleteButton={true}
        onDelete={handleDelete}
      />
    </Modal>
  );
}
