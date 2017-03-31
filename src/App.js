import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './List';
import DetailPage from './DetailPage';
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
        // console.log(data.items);
        this.setState({ items: data.items });
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() { 
    this.fetchData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1>My YouTube Playlist</h1>

          </div>
          
          <Route
            exact path="/"
            render={() => (
                <List items={this.state.items}>
                </List>
              )
            }
          />
          <Route
            path="/detail"
            component={DetailPage}
          />

        </div>
      </Router>
    );
  }
}

export default App;
