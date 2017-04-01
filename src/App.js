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
      <Router
        basename="/ytf"
      >
        <div className="App">
          
          <Header />

          <Route
            exact path="/"
            render={() => (
                <div className='page list-page'>
                  <div className='page-content'>
                    <List items={this.state.items}>
                    </List>
                  </div>
                </div>
              )
            }
          />
          
          <Route
            path="/detail/:id"
            
            // method 1
            // passes items : NO
            // acces to location (and item id) on detail page : YES
            component={DetailPage}
            
            // method 2
            // passes items : YES
            // acces to location (and item id) on detail page : NO
            // component={() => (
            //   <DetailPage items={this.state.items}>
            //   </DetailPage>
            // )}
            
            // thid doesn't work.
            items={this.state.items}
          />

        </div>
      </Router>
    );
  }
}

export default App;
