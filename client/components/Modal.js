import React, { Component } from 'react';

const createHtml = (html) => {
  return {__html: html}
}

const Modal = ({
  link,
  title,
  body,
  close,
}) => {
  return (
    <React.Fragment>
      <div className='modal-overlay'></div>
      <div className='modal'>
        <div className='modal-close' onClick={close}>&times;</div>
        <div className='modal-title'>{title}</div>
        <div className='modal-body'>
          <div dangerouslySetInnerHTML={createHtml(body)}></div>
        </div>
        <div className='modal-footer'>
          <a href={link} target='_blank'>Ссылка на оригинал</a> 
        </div>
      </div>  
    </React.Fragment>
  )
}

export default Modal;