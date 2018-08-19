import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';

import Table from './Table';

export class App extends Component {

  static propTypes = {
  }

  state = {
    questions: [],
  }

  componentDidMount() {
    fetch('http://api.stackexchange.com/2.2/questions?site=stackoverflow&filter=withbody')
    .then((res) => res.json())
    .then(data => {
      console.log(data)
      this.setState({questions: data.items})
    })
  }

  render() {
    const { questions } = this.state;
    return (
      <main className='main'>
        <Table 
          list={questions}
        />
      </main>
    )
  }
}


export default hot(module)(App);