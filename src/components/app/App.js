import React, { Component } from 'react';
import './App.css';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Git Issues for {window.CONFIG.owner}/{window.CONFIG.repo}</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
