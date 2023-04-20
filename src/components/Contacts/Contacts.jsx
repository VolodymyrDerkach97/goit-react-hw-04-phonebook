import ContactsItem from '../ContactsItem';
import PropTypes from 'prop-types';

const Contact = ({ contacts, deleteContact }) => {
  return (
    <>
      <ul>
        {contacts.length !== 0 ? (
          contacts.map(({ name, id, number }) => (
            <ContactsItem
              key={id}
              name={name}
              id={id}
              number={number}
              deleteContact={deleteContact}
            />
          ))
        ) : (
          <li>No contacts found</li>
        )}
      </ul>
    </>
  );
};

export default Contact;

Contact.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
