import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';

import Table from './Table';
import Modal from './Modal';

export class App extends Component {

  static propTypes = {
  }

  state = {
    questions: [],
    modalIsOpen: false,
    modalProps: {}
  }

  componentDidMount() {
    fetch('http://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&filter=withbody')
    .then((res) => res.json())
    .then(data => {
      console.log(data)
      this.setState({questions: data.items})
    })
  }

  openModal = (data) => {
    this.setState({
      modalProps: data,
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    const { questions, modalIsOpen, modalProps } = this.state;
    return (
      <main className='main'>
        <Table 
          list={questions}
          openModal={this.openModal}
        />
        { modalIsOpen &&
          <Modal 
            close={this.closeModal}
            {...modalProps}
          />
        }
        
      </main>
    )
  }
}


export default hot(module)(App);