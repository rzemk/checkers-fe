/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */

import React from 'react';

export default (props) => {
  const cls = props.seat.isPurchased ? 'taken' : 'open';
  return <div data-id={props.seat._id} onClick={props.purchase} className={cls}>{props.seat.name}</div>;
};
