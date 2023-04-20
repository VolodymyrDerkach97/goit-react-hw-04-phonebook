import { DeleteButton, Contact } from './ContactsItem.styled';

const ContactsItem = ({ name, id, number, deleteContact }) => {
  return (
    <Contact>
      {name}: {number}
      <DeleteButton
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </DeleteButton>
    </Contact>
  );
};

export default ContactsItem;
