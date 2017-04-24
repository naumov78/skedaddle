import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router path="/" component={App} />
    </Provider>
  );
};

export default Root;
