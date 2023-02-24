import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizContextProvider from './context/QuizContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizContextProvider>
       <App />
  </QuizContextProvider>
);
