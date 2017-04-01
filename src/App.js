import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import List from './List';
import DetailPage from './DetailPage';
import moment from 'moment';

moment.locale('en');

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
        
        let items = data.items.map((item) => ({
          date: moment( item.snippet.publishedAt ).format("MMM Do, YYYY"),
          description: item.snippet.description,
          id: item.contentDetails.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
          title: item.snippet.title,
        }));

        this.setState({ items: items });
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
          <Header />
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
