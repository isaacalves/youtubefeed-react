import React, { Component } from 'react';

// v3
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// v4
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Loading from 'react-loading';
import moment from 'moment';

// components
import Pagination from './components/Pagination';

//pages
import Layout from './pages/Layout';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

moment.locale('en');

class App extends Component {
  constructor() {
    super();

    // this need serious refactor. try flux/redux and container components
    
    this.state = {
      items: null,
      nextPageToken: null,
      prevPageToken: null,
    };
  }

  /*
  Get YouTube playlist feed URL 
   */
  getFeedURL({playlistId, pageToken}) {
    let id = playlistId ? playlistId : this.props.defaultPlaylistId;
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=${id}&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;
    if (pageToken){
      url += '&pageToken=' + pageToken;
    }
    console.log('getFeedUrl: ', url);

    return url;
  }
  
  fetchData(url) {
    // console.log('fetchData, url: ', url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(this.props.url);
        
        let items = data.items.map((item) => ({
          date: moment( item.snippet.publishedAt ).format("MMM Do, YYYY"),
          description: item.snippet.description,
          id: item.contentDetails.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
          title: item.snippet.title,
          slug: this.generateSlug(item.snippet.title)
        }));

        this.setState({
          items: items,
          nextPageToken: data.nextPageToken,
          prevPageToken: data.prevPageToken,
        });
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

  prevPage() {
    let url = this.getFeedURL({ pageToken: this.state.prevPageToken });
    this.fetchData(url);
  }

  nextPage() {
    let url = this.getFeedURL({ pageToken: this.state.nextPageToken });
    this.fetchData(url);
  }

  componentDidMount() { 
    this.setState({
      playlistId: this.props.defaultPlaylistId
    })

    this.fetchData(this.getFeedURL({}));
    // this is weird
    // how to have a function expect 2 optional params and use destructuring?
  }

  render() {
    // console.log('App render');
    const { items } = this.state;

    return (
      <Router basename='/ytf'>
        <Layout>
          { items ? (
            <Route
              exact path='/'
              render={() => (
                <div>
                  <Pagination
                    prevPageToken={this.state.prevPageToken}
                    prevPageHandler={this.prevPage.bind(this)}
                    nextPageToken={this.state.nextPageToken}
                    nextPageHandler={this.nextPage.bind(this)}
                  >
                  </Pagination>
                  <ListPage items={this.state.items}>
                  </ListPage>
                  <Pagination
                    prevPageToken={this.state.prevPageToken}
                    prevPageHandler={this.prevPage.bind(this)}
                    nextPageToken={this.state.nextPageToken}
                    nextPageHandler={this.nextPage.bind(this)}
                  >
                  </Pagination>
                </div>
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
            <Route
              path='/:slug'
              render={({ match }) => (
                // how to load the detail page if not in the first 10?
                <DetailPage item={items.find(item => item.slug === match.params.slug)}/>     
            )}/>
          )}
        </Layout>
      </Router>
    );
  }
}
export default App;
