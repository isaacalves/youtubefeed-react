import React, { Component } from 'react';
import List from './List.jsx';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    };
  }

  fetchData() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => {
        //console.log(data.items);
        this.setState({ items: data.items });
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() { 
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>My YouTube Playlist</h2>
        </div>
        <List items={this.state.items}>
        </List>
      </div>
    );
  }
}

export default App;
