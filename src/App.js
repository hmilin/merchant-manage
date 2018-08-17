import React, { Component } from 'react';
import './App.css';
import Route from './router/index';

class App extends Component {
    render(){
      return(
        <div id="app">
          <Route />
        </div>
      );
    }
  }

export default App;
