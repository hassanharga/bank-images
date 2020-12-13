import React from 'react';
import './App.scss';
import { Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') || null;
  };
  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <Route
        path='/login'
        exact
        render={() => (!isAuthenticated() ? <Login /> : <Redirect to='/' />)}
      />
      <Route
        path='/register'
        exact
        render={() => (!isAuthenticated() ? <Register /> : <Redirect to='/' />)}
      />
      <Route
        path='/'
        exact
        render={() => (isAuthenticated() ? <Home /> : <Redirect to='/login' />)}
      />
    </div>
  );
};

export default App;
