import React, { Component } from 'react';
import Item from './Item';

class Table extends Component {
  render() {
    return (
      <div className='table'>
        <div className='table-header'>
          <div className='table-col'>Автор</div>
          <div className='table-col'>Заголовок</div>
          <div className='table-col'>Дата создания</div>
        </div>
        <div className='table-body'>
          {
            this.props.list.map((q,i) => (
              <Item 
                key={i}
                onClick={() => this.props.openModal(q)}
                {...q}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Table;