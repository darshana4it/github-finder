import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading } = this.state) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='row'>
        {users.map(user => (
          <div key={user.id} className='col-md-2'>
            <UserItem user={user} />
          </div>
        ))}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
