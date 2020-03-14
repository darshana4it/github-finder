import React from 'react';

const Alert = props => {
  const { alert } = props;

  if (alert != null) {
    return <div className={`alert alert-${alert.type}`}>{alert.message}</div>;
  }
  return '';
};

export default Alert;
