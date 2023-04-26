import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Contact from '../Contacts';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import { Container } from './App.styled';

const INITIAL_VALUE_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export const App = () => {
  const initValueLocalStorage = () => {
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLocalStorage) {
      return contactsLocalStorage;
    }
    return INITIAL_VALUE_CONTACTS;
  };
  const [contacts, setContacts] = useState(initValueLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmitForm = (name, number) => {
    const contactId = nanoid();

    setContacts(prevState => [
      { id: contactId, name: name, number: number },
      ...prevState,
    ]);
  };

  const filterContacts = () => {
    const normalaizeContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizeContacts)
    );
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm onSabmit={handleSubmitForm} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <Contact contacts={filterContacts()} deleteContact={deleteContact} />
    </Container>
  );
};
