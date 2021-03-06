import React from 'react';
import { PropTypes } from 'prop-types';

const Item = ({
  owner,
  title,
  creation_date,
  onClick
}) => {
  const date = new Date(creation_date*1000).toDateString();
  return (
    <div className='table-item' onClick={onClick}>
      <div className='table-col'>{owner.display_name}</div>
      <div className='table-col'>{title}</div>
      <div className='table-col'>{date}</div>
    </div>
  )
}

Item.propTypes = {
  owner: PropTypes.object,
  title: PropTypes.string,
  creation_date: PropTypes.number,
  onClick: PropTypes.func,
}

export default Item;