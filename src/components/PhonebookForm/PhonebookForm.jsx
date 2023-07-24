import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './PhonebookForm.styles.css';

export class PhonebookForm extends Component {
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
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="phonebook_form">
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            pattern="^[A-Za-z.'\- ]+$"
            className="form_input"
            placeholder="Name"
          />
          <h2>Number</h2>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            required
            pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
            className="form_input"
            placeholder="Number"
          />
          <button type="submit" className="submit_button">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}
