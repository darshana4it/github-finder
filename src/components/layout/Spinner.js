import React, { Fragment } from 'react';
import spinner from './spinner.svg';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ display: 'block', margin: 'auto', width: '100px' }}
    />
  </Fragment>
);

export default Spinner;
