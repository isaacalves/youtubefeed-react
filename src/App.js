import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';

//components
// import Header from './components/Header';
// import List from './components/List';

//pages
import Layout from './pages/Layout';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

moment.locale('en');

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: null,
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
          slug: this.generateSlug(item.snippet.title)
        }));

        this.setState({ items: items });
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  generateSlug(title) {
    // consider maybe using this: https://pid.github.io/speakingurl/
    let newTitle = title
      /* Remove unwanted characters, only accept alphanumeric and space */
      .replace(/[^A-Za-z0-9 ]/g,'')
      /* Replace multi spaces with a single space */
      .replace(/\s{2,}/g,' ')
      /* Replace space with a '-' symbol */
      .replace(/\s/g, "-")
      .toLowerCase();
    return newTitle;
  }

  componentDidMount() { 
    this.fetchData();
  }

  render() {
    const { items } = this.state;

    return (
      <Router basename='/ytf'>
        <Layout>
          { items && (
            <Route
              exact path='/'
              render={() => (
                <ListPage items={this.state.items}>
                </ListPage>
              )}
            />
          )}
          { items && (
            <Route path='/detail/:slug' render={({ match }) => (
              <DetailPage item={items.find(item => item.slug === match.params.slug)}/>     
            )}/>
          )}
        </Layout>
      </Router>
    );
  }
}
export default App;
