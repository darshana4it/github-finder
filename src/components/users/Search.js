import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClear, searchUsers, clearSearch, setAlert }) => {
  const [keyword, setKeyword] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (keyword.length > 0) {
      searchUsers(keyword);
    } else {
      setAlert('Please enter a valid keyword', 'danger');
    }
  };

  const onClear = e => {
    e.preventDefault();

    setKeyword('');
    clearSearch();
  };

  return (
    <div className='mb-3'>
      <form onSubmit={onSubmit}>
        <div className='input-group'>
          <input
            className='form-control'
            type='text'
            name='text'
            placeholder='Search users...'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' type='submit'>
              Search
            </button>
            {showClear && (
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={onClear}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;
