import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    keyword: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };

  onSubmit(e) {
    e.preventDefault();

    if (this.state.keyword.length > 0) {
      this.props.searchUsers(this.state.keyword);
    } else {
      this.props.setAlert('Please enter a valid keyword', 'danger');
    }
  }

  clearSearch = () => {
    this.props.clearSearch();
    this.setState({ keyword: '' });
  };

  render() {
    const { showClear } = this.props,
      { keyword } = this.state;
    return (
      <div className='mb-3'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='input-group'>
            <input
              className='form-control'
              type='text'
              name='text'
              placeholder='Search users...'
              value={keyword}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
            <div className='input-group-append'>
              <button className='btn btn-primary' type='submit'>
                Search
              </button>
              {showClear && (
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  onClick={this.clearSearch}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
