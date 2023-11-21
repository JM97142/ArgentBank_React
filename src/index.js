import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Components
import Header from './components/Header/Header';
import Home from './pages/Homepage';
import SignIn from './pages/Signin/Signin';
import User from './pages/User/User';
import Error from './pages/Error/Error';
import Footer from './components/Footer/Footer';

const contenair = document.getElementById('root');
const root = createRoot(contenair);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/user' element={<User />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>
)
