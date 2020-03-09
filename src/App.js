import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import UserProfile from './components/layout/UserProfile';

import About from './components/pages/About';

import axios from 'axios';
import './styles/main.scss';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    // const data = fetch('https://api.github.com/users?since=0')
    //   .then(res => res.json())
    //   .then(res => console.log(res));

    const res = await axios.get(
      `https://api.github.com/users?since=0&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async keyword => {
    let res = [];
    this.clearAlert();

    if (keyword.length > 0) {
      this.setState({ loading: true });
      res = await axios.get(
        `https://api.github.com/search/users?q=${keyword}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({ users: res.data.items, loading: false });
    }
  };

  getUser = async username => {
    let res = {};
    this.setState({
      loading: true
    });
    res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
    console.log(this.state.user);
  };

  clearSearch = () => {
    this.clearAlert();
    this.setState({
      users: [],
      alert: {
        message: 'Please search enter a keyword and search...',
        type: 'info'
      }
    });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: { message, type }
    });
  };

  clearAlert = () => {
    this.setState({
      alert: null
    });
  };

  showUser = () => {};

  render() {
    const title = 'Github Finder',
      { users, loading, alert } = this.state;

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
                      searchUsers={this.searchUsers}
                      clearSearch={this.clearSearch}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                      showUser={this.showUser}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                component={props => <UserProfile />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
