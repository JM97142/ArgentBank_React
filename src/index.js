import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Homepage';
import SignIn from './pages/Signin/Signin';
import User from './pages/User/User';
import Footer from './components/Footer/Footer';
import store from './redux/store';

const contenair = document.getElementById('root');
const root = createRoot(contenair);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/user' element={<User />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>
)
