import React, { Component } from 'react';

const Item = ({
  owner,
  title,
  creation_date
}) => {
  const date = new Date(creation_date).toDateString();
  return (
    <div className='table-item'>
      <div className='table-col'>{owner.display_name}</div>
      <div className='table-col'>{title}</div>
      <div className='table-col'>{date}</div>
    </div>
  )
}

export default Item;