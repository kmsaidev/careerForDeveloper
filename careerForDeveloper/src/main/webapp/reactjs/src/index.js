import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import store from './Store';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import App from './components/App';

// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const container =
    document.getElementById("root");
const root = createRoot(container);
root.render(<CookiesProvider>
    <Provider store={store}>
        <App />
    </Provider>
</CookiesProvider>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
