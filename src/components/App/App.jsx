import { Component } from 'react';
import { nanoid } from 'nanoid';
import Contact from '../Contacts';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLocalStorage) {
      this.setState({ contacts: contactsLocalStorage });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState) {
      const updateLocalStorage = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', updateLocalStorage);
    }
  }

  nameInputId = nanoid();
  telInputId = nanoid();

  handleSubmitForm = ({ name, number }) => {
    const contactId = nanoid();

    this.setState(prevState => ({
      contacts: [
        { id: contactId, name: name, number: number },
        ...prevState.contacts,
      ],
    }));
  };

  handleFilterChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalaizeContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizeContacts)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = this.filterContacts();

    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSabmit={this.handleSubmitForm} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={filter} />
        <Contact contacts={filterContacts} deleteContact={this.deleteContact} />
      </Container>
    );
  }
}
