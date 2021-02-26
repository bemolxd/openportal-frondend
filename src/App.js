import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import AuthRoute from './utils/AuthRoute';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions';

import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';
import user from './Pages/user';
import axios from 'axios';

axios.defaults.baseURL = 'https://europe-west1-openportal-bem.cloudfunctions.net/api';

const token = localStorage.OpenPortalToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
}

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:username" component={user} />
                <Route exact path="/users/:username/post/:postID" component={user} />
              </Switch>
            </div>
          </Router>
      </Provider>
    )
  }
}

export default App
