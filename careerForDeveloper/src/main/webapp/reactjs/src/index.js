import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import AppRouter from "./AppRouter";

// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.render(
    <AppRouter />, document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
