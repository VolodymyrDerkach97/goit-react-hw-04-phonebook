import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, InputWraper, Input, Button } from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitContact = e => {
    const { name } = this.state;
    e.preventDefault();
    if (this.props.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.props.onSabmit(this.state);
    this.reset();
  };

  nameInputId = nanoid();
  telInputId = nanoid();

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <Form action="" onSubmit={this.onSubmitContact}>
        <InputWraper>
          <label htmlFor={this.nameInputId}>Name</label>
          <Input
            id={this.nameInputId}
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </InputWraper>
        <InputWraper>
          <label htmlFor={this.telInputId}>Number</label>
          <Input
            mask="999-99-99"
            id={this.telInputId}
            type="tel"
            value={this.state.number}
            onChange={this.handleInputChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputWraper>

        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}
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
