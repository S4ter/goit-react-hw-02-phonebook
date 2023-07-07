import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Phonebook } from 'components/Phonebook/phonebook';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Phonebook />
    <App />
  </React.StrictMode>
);
