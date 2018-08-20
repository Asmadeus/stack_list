import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Item from './Item';

class Table extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    openModal: PropTypes.func,
  }

  render() {
    const { loading, list, openModal } = this.props;
    return (
      <div className={`table ${loading ? '__loading' : ''}`}>
        <div className='table-header'>
          <div className='table-col'>Автор</div>
          <div className='table-col'>Заголовок</div>
          <div className='table-col'>Дата создания</div>
        </div>
        <div className='table-body' onScroll={this.props.onScroll}>
          {
            list.map((q,i) => (
              <Item 
                key={i}
                onClick={() => openModal(q)}
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