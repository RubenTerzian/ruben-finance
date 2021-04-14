import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDMuWF0pnSvTGQ7ZXIRBh4GBnqXW6KWYfM",
  authDomain: "ruben-finance.firebaseapp.com",
  databaseURL: "https://ruben-finance-default-rtdb.firebaseio.com",
  projectId: "ruben-finance",
  storageBucket: "ruben-finance.appspot.com",
  messagingSenderId: "945951063570",
  appId: "1:945951063570:web:47cfaa3b5a8a3ae12e22cb"
};


firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
