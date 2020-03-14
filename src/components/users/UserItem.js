import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className='card'>
      <img
        className='card-img-top'
        src={avatar_url}
        alt={`Avatar of ${login}`}
      />
      <div className='card-body'>
        <h5 className='card-title'>{login}</h5>
        {/* <p className='card-text'>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
        <Link to={`/user/${login}`} className='btn btn-primary'>
          Github
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
