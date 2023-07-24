import React, { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate() {
    localStorage.setItem('addedContacts', JSON.stringify(this.state.contacts));
  }
  componentDidMount() {
    const storedContacts = localStorage.getItem('addedContacts');
    this.setState({ contacts: JSON.parse(storedContacts) });
  }
  checkDuplicateContact = name => {
    return this.state.contacts.some(contact => contact.name === name);
  };
  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    console.log(this.state.contacts);
  };
  deleteContact = index => {
    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts.splice(index, 1);
      return { contacts: updatedContacts };
    });
  };
  handleFilterChange = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <PhonebookForm
          addContact={this.addContact}
          checkDuplicateContact={this.checkDuplicateContact}
        />

        <ContactsList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
      </div>
    );
  }
}
