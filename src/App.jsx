import React, { Component } from 'react';
import './App.css';
import News from './components/hacker-news';

class App extends Component {
  render() {
    return (
      <div className="App">
        <News />
      </div>
    );
  }
}

export default App;
