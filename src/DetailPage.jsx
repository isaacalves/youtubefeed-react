import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';


//<Video from='youtube' videoId={videoId} />
export default class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {}; //?
  }

  render() {
    // this won't work: because render must return something. also too imperative? 
    // if (this.props.location.state === undefined){
    //   console.log('undef');
    //   // browserHistory.push('/');
    //   this.props.history.push('/');
    //   return;
    // }

    // if navigatin from URL directly, there won't be location and this will error
    const { videoProps } = this.props.location.state;
    
    // https://github.com/troybetz/react-youtube
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }

    // let videoProps = {
    //   title: 'a',
    //   id: 'a',
    //   publishedAt: 'a',
    //   description: 'a',
    // }

    // this works...
    // let s = this.props.location.pathname;
    // const id = s.substr(s.lastIndexOf('/') + 1);
    
    // but this is better:
    // const id = this.props.match.params.id;
    // ...but this doesn't work if using an anonymous wrapper on the detail Route in App

    // jesus...

    // console.log(id);

    console.log(this.props);
    //console.log(this.props.route); //why not
    
    // obs: this view gets rendered twice if loaded directly from the url (once again after data is fetched)

    // obs (layout): video in col-sm-6 doesn't look good so I left col-xs-12
    
    return (
      <div className='page detail-page'>
        <div className='page-content'>
          <div className='container-fluid'>
            <Link to='/'>Back</Link>
            <div className='item-detail'>
              <div className='row'>
                <div className='col-xs-12'>
                  <h1 className='title'>{videoProps.title}</h1>          
                  <div className='date strong'>{videoProps.date}</div>
                </div>
                <div className='col-xs-12'>
                  <div className='responsive-embed-youtube'>
                    <YouTube
                      videoId={videoProps.id}
                      opts={videoOptions}
                    ></YouTube>
                  </div>
                </div>
                <div className='col-xs-12'>
                  <div className='description'>{videoProps.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}