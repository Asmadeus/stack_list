import React from 'react';
import ReactDOM from 'react-dom';

import './styles/App.scss'

import App from './components/App';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(App);

if (module.hot) {
  module.hot.accept();
}