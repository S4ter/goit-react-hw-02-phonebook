import React, { Component } from 'react';
import { nanoid } from 'nanoid';
class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = event => {
    const { value, name } = event.target;
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addContact(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="tel"
            name="number"
            // pattern="(\+[0-9]{2}\s)?[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{3}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    );
  }
}

class ContactsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map(({ id, name, number }) => (
            <li key={id}>
              {name}: {number}
              <button onClick={() => this.props.deleteContact(id)}>usun</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    const contact = { id: nanoid(), ...data };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  deleteContact = id => {
    console.log(id);
    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts.splice(id, 1);
      return { contacts: updatedContacts };
    });
  };

  render() {
    console.log(this.state.contacts);
    return (
      <div>
        <PhonebookForm addContact={this.addContact} />
        <ContactsList
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
