import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import UserProfile from './components/users/UserProfile';

import About from './components/pages/About';

import axios from 'axios';
import './styles/main.scss';

const App = props => {
  const [users, setUsers] = useState([]);
  //eslint-disable-next-line
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const res = await axios.get(
        `https://api.github.com/users?since=0&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data);
    }

    setLoading(false);

    fetchData();
    //eslint-disable-next-line
  }, []);

  const searchUsers = async keyword => {
    let res = [];
    clearAlert();

    if (keyword.length > 0) {
      setLoading(true);
      res = await axios.get(
        `https://api.github.com/search/users?q=${keyword}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setUsers(res.data.items);
    }
  };

  const getUser = async username => {
    let res = {};
    setLoading(true);

    res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setLoading(false);
    setUser(res.data);
  };

  const clearSearch = () => {
    clearAlert();
    setUsers([]);
    setAlert({
      message: 'Please search enter a keyword and search...',
      type: 'info'
    });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  const showUser = () => {};

  const title = 'Github Finder';

  return (
    <Router>
      <div className='App'>
        <Navbar title={title} />
        <div className='container mt-5'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearSearch={clearSearch}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  {users.length > 0 ? (
                    <Users
                      loading={loading}
                      users={users}
                      showUser={showUser}
                    />
                  ) : (
                    <p>No data fetched</p>
                  )}
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <UserProfile {...props} getUser={getUser} user={user} />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
