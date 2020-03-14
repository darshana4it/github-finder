import React, { useEffect } from 'react';

const UserProfile = ({ user, getUser, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    avatar_url,
    bio,
    blog,
    email,
    followers,
    hireable,
    html_url,
    location,
    login,
    name,
    public_repos,
    repos_url
  } = user;

  return (
    <div className='row'>
      <div className='col-md-3'>
        <div className='card'>
          <img
            src={avatar_url}
            alt={`Avatar of ${login}`}
            className='w-100 card-img-top'
          />
          <div className='card-body py-2'>
            <small className='card-title mb-0'>
              {hireable ? (
                <a href={html_url} target='_blank' rel='noopener noreferrer'>
                  Hire {login}
                </a>
              ) : (
                'Not available to hire'
              )}
            </small>
          </div>
        </div>
        <div className='mt-3'>
          <h5>{name !== null ? name : login}</h5>
          <p>{location !== null ? location : ''}</p>
          <p>
            {blog !== null ? (
              <a href={blog} target='_blank' rel='noopener noreferrer'>
                Blog
              </a>
            ) : (
              ''
            )}
            <br />
            {email !== null ? (
              <a
                href={`mailto:${email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {email}
              </a>
            ) : (
              ''
            )}
          </p>
        </div>
      </div>
      <div className='col-md-9'>
        <div className='row'>
          <div className='col-md-8'>
            <p>{bio !== null ? bio : 'No bio available'}</p>
            <a
              href={html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary'
            >
              View Github Profile
            </a>
          </div>
          <div className='col-md-4'>
            <ul>
              <li>Followers: {followers}</li>
              <li>
                Number of repos: {public_repos}{' '}
                <a
                  href={repos_url}
                  className='btn btn-sm btn-secondary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Repos
                </a>
              </li>
            </ul>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default UserProfile;
