import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loading from 'react-loading';
import moment from 'moment';

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

  /*
  Get YouTube playlist feed URL 
   */
  getFeedURL(id) {
    return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=${id}&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;
  }
  
  fetchData(id) {
    fetch( this.getFeedURL(id) )
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
    this.fetchData(this.props.id);
  }

  render() {
    console.log('App render');
    const { items } = this.state;

    return (
      <Router basename='/ytf'>
        <Layout>
          { items ? (
            <Route
              exact path='/'
              render={() => (
                <ListPage items={this.state.items}>
                </ListPage>
              )}
            />
          ) : (
            <div className='text-center'>
              <span>loading...</span>
              <div className='loading-animation'>
                <Loading
                  type='bubbles'
                  color='#000'
                  className='loading-animation'
                />
              </div>
            </div>
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
