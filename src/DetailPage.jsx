import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

//<Video from='youtube' videoId={videoId} />
export default class DetailPage extends Component {
  render() {
    const { videoProps } = this.props.location.state;
    // https://github.com/troybetz/react-youtube
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }      
    }

    // console.log(videoProps);
    return (
      <div className='page detail-page'>
        <div className='page-content'>
          <div className='container-fluid'>
            <Link to='/'>Back</Link>
            <div className='item-detail'>
              <h1 className='title'>{videoProps.title}</h1>          
              <div className='responsive-embed-youtube'>
                <YouTube
                  videoId={videoProps.id}
                  opts={videoOptions}
                ></YouTube>
              </div>
              <div className='date'>{videoProps.publishedAt}</div>
              <div className='description'>{videoProps.description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}