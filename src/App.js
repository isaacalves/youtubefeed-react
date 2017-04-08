import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Redirect
} from 'react-router-dom';
import Loading from 'react-loading';
import moment from 'moment';
// import { Motion } from 'react-motion';
// import { RouteTransition } from 'react-router-transition';

import Pagination from './components/Pagination';

import Layout from './pages/Layout';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

moment.locale('en');

class NoMatch extends Component {
  render(){
    return (
      <Redirect to={`/`}/>
    )
  }
}

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

  getFeedURL({playlistId, pageToken}) {
    let id = playlistId ? playlistId : this.props.defaultPlaylistId;
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=50&playlistId=${id}&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;
    if (pageToken){
      url += '&pageToken=' + pageToken;
    }
    return url;
  }
  
  fetchData(url) {
    // console.log('fetchData, url: ', url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);

        if (data.items){
          let items = data.items.map((item) => ({
            date: moment( item.snippet.publishedAt ).format("MMM Do, YYYY"),
            description: item.snippet.description,
            id: item.contentDetails.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            slug: this.generateSlug(item.snippet.title)
          }));

          items.reverse();

          this.setState({
            items: items,
            nextPageToken: data.nextPageToken,
            prevPageToken: data.prevPageToken,
          });
        }

        // if (data.error && data.error.message){
        //   console.error(data.error.message);
        // }
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
    if (this.state.prevPageToken){
      let url = this.getFeedURL({ pageToken: this.state.prevPageToken });
      this.fetchData(url);
    }
  }

  nextPage() {
    if (this.state.nextPageToken){
      let url = this.getFeedURL({ pageToken: this.state.nextPageToken });
      this.fetchData(url);
    }
  }

  componentDidMount() { 
    this.setState({
      playlistId: this.props.defaultPlaylistId
    })

    this.fetchData(this.getFeedURL({}));

    // this.fetchData(this.getFeedURL({
    //   playlistId: this.props.defaultPlaylistId
    // }));
    // this is weird
    // how to have a function expect 2 optional params and use destructuring?
  }

  render() {
    console.log('App render');
    const { items } = this.state;

    return (
      <Router basename='/ytf'>
        <Layout>
          {
            // <Route path='/' exact render={({ match }) => (
            //   <Redirect to={`/playlist`}/>
            // )}/>
          }
          { items ? (
            <Route
              exact path='/'
              render={() => (
                <div>
                  { (this.state.prevPageToken || this.state.nextPageToken) &&
                    <Pagination
                      enablePrev={this.state.prevPageToken}
                      enableNext={this.state.nextPageToken}
                      prevPageHandler={this.prevPage.bind(this)}
                      nextPageHandler={this.nextPage.bind(this)}
                    >
                    </Pagination>
                  }
                  <ListPage items={this.state.items}>
                  </ListPage>
                  { (this.state.prevPageToken || this.state.nextPageToken) &&
                    <Pagination
                      enablePrev={this.state.prevPageToken}
                      enableNext={this.state.nextPageToken}
                      prevPageHandler={this.prevPage.bind(this)}
                      nextPageHandler={this.nextPage.bind(this)}
                    >
                    </Pagination>
                  }
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
              path='/video/:slug'
              render={({ match }) => (
                // how to load the detail page if not in the first 10?
                <DetailPage item={items.find(item => item.slug === match.params.slug)}/>     
            )}/>
          )}
          <Route component={NoMatch} />
        </Layout>
      </Router>
    );
  }
}

export default App;
