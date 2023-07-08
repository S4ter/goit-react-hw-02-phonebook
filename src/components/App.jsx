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

    const { name, number } = this.state;

    if (this.props.checkDuplicateContact(name)) {
      alert('Contact with the same name already exists!');
      return;
    }

    this.props.addContact({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };
  // handleSubmit = event => {
  //   event.preventDefault();

  //   this.props.addContact(this.state);
  //   this.setState({ name: '', number: '' }); // Wyczyść pola po dodaniu kontaktu
  // };
  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.addContact(this.state);
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="tel"
            name="number"
            // pattern="(\+[0-9]{2}\s)?[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{3}"
            // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
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
    const filteredContacts = this.props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.props.filter.toLowerCase())
    );

    return (
      <div>
        <ul>
          {filteredContacts.map(({ name, number }, index) => (
            <li key={index}>
              {name}: {number}
              <button onClick={() => this.props.deleteContact(index)}>
                usun
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
// class ContactsList extends Component {
//   render() {
//     return (
//       <div>
//         <ul>
//           {this.props.contacts.map(({ name, number }, index) => (
//             <li key={index}>
//               {name}: {number}
//               <button onClick={() => this.props.deleteContact(index)}>
//                 usun
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  checkDuplicateContact = name => {
    return this.state.contacts.some(contact => contact.name === name);
  };
  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  // addContact = data => {
  //   const contact = { id: nanoid(), ...data };
  //   this.setState(prevState => ({
  //     contacts: [...prevState.contacts, contact],
  //   }));
  // };
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
    return (
      <div>
        <PhonebookForm
          addContact={this.addContact}
          checkDuplicateContact={this.checkDuplicateContact}
        />
        <input
          type="text"
          name="filter"
          placeholder="Filter contacts"
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ContactsList
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
