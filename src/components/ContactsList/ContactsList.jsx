import React, { Component } from 'react';
import './ContactsList.styles.css';
export class ContactsList extends Component {
  render() {
    const { filter, onFilterChange } = this.props;
    const filteredContacts = this.props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.props.filter.toLowerCase())
    );

    return (
      <div className="filter_form">
        <h2 className="filter_title">Contacts:</h2>
        <input
          type="text"
          name="filter"
          placeholder="Search..."
          value={filter}
          onChange={onFilterChange}
          className="filter_input"
        />
        <ul>
          {filteredContacts.map(({ name, number }, index) => (
            <li key={index}>
              {name}: {number}
              <button
                className="delete_button"
                onClick={() => this.props.deleteContact(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
