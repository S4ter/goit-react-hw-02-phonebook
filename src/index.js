import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Feedback } from 'components/feedback/feedback';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Feedback />
    <App />
  </React.StrictMode>
);
