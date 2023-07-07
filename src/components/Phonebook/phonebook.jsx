import React, { Component } from 'react';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { name, filter, number } = this.props;
    console.log('działa submit');
    this.props.onSubmit({ ...this.state });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="phonebook_container">
          <label>
            Name:
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              value={this.name}
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </div>
        <div className="contacts_containter">
          <h2>Contacts:</h2>
          <ul className="rendered_list"></ul>
        </div>
      </form>
    );
  }
}
