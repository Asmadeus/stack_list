import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Table from './Table';
import Modal from './Modal';

const API_URL = 'http://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&filter=withbody';

export class App extends Component {

  state = {
    questions: [],
    modalIsOpen: false,
    modalProps: {},
    page: 1,
    loading: false,
  }

  componentDidMount() {
    this.fetchData(this.state.page);
  }

  fetchData = (page) => {
    this.setState({loading: true})
    fetch(API_URL + `&page=${page}`)
    .then((res) => res.json())
    .then(data => {
      this.setState({ 
        questions: this.state.questions.concat(data.items),
        loading: false
      })
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

  scrollTable = (e) => {
    const scrollTop = e.target.scrollTop;
    const height = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    if (scrollTop + height >= scrollHeight) {
      const page = this.state.page + 1;
      this.fetchData(page);
      this.setState({page})
    }
  }

  render() {
    const { questions, modalIsOpen, modalProps, loading } = this.state;
    return (
      <main className='main'>
        <Table 
          list={questions}
          openModal={this.openModal}
          onScroll={this.scrollTable}
          loading={loading}
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