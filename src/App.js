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
      items: [],
      //currentItemId ?
      //currentItem object (with all props) ?
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
    let newTitle = title
      /* Remove unwanted characters, only accept alphanumeric and space */
      .replace(/[^A-Za-z0-9 ]/g,'')
      /* Replace multi spaces with a single space */
      .replace(/\s{2,}/g,' ')
      /* Replace space with a '-' symbol */
      .replace(/\s/g, "-")
      .toLowerCase();
    return newTitle;
    // consider this: https://pid.github.io/speakingurl/
  }

  getItemBySlug(slug) {
    console.log('getItemBySlug');
    // could be used from detail page can retrieve the item
    // console.log('getItemBySlug: ', slug);
  }

  componentDidMount() { 
    this.fetchData();
  }

  render() {
    return (
      <Router basename='/ytf'>
        <Layout>
          <Route
            exact path="/"
            // render={() => (
            //     <div className='page list-page'>
            //       <div className='page-content'>
            //         <List items={this.props.items}>
            //         </List>
            //       </div>
            //     </div>
            //   )
            // }
            render={() => (
                <ListPage items={this.state.items}>
                </ListPage>
              )
            }
          />
          <Route
            path='/detail/:slug'
            
            // method 1
            // passes items : NO
            // access to location (and item id) on detail page : YES
            component={DetailPage}
            
            // method 2
            // passes items : YES
            // acces to location (and item id) on detail page : NO
            // component={() => (
            //   <DetailPage items={this.state.items}>
            //   </DetailPage>
            // )}
            
            // method 3
            // this is not accessible on DetailPage via this.props.route.test 
            // because this.props.route is undefined
            test='xxx'

            // method 4
            render={() => (
                <DetailPage test='foo'>
                </DetailPage>
              )
            }

          />
        </Layout>
      </Router>
    );
  }
}

export default App;
