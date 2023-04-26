import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, InputWraper, Input, Button } from './ContactForm.styled';

const ContactForm = ({ contacts, onSabmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmitContact = e => {
    e.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    onSabmit(name, number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  const nameInputId = nanoid();
  const telInputId = nanoid();

  return (
    <Form action="" onSubmit={onSubmitContact}>
      <InputWraper>
        <label htmlFor={nameInputId}>Name</label>
        <Input
          id={nameInputId}
          type="text"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputWraper>
      <InputWraper>
        <label htmlFor={telInputId}>Number</label>
        <Input
          mask="999-99-99"
          id={telInputId}
          type="tel"
          value={number}
          onChange={({ target: { value } }) => setNumber(value)}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputWraper>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSabmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
