import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header';
import Home from './pages/Homepage';
import SignIn from './pages/Signin/signin';
import UserPage from './pages/User/userpage';
import Footer from './components/Footer/Footer';
import reportWebVitals from './reportWebVitals';

const contenair = document.getElementById('root');
const root = createRoot(contenair);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
