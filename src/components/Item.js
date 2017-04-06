import React from 'react';
import YouTube from 'react-youtube';

export default class Item extends React.Component {
	
  render() {  	
  	const videoOptions = {
	    // https://developers.google.com/youtube/player_parameters
	    playerVars: {
	      autoplay: 0
	    }
	  }

    return (
    	<div className='item-detail'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 className='title'>{this.props.title}</h1>          
            <p className='date'>Published on {this.props.date}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='responsive-embed-youtube'>
              <YouTube
                videoId={this.props.videoId}
                opts={videoOptions}
              ></YouTube>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='description'>{this.props.description}</div>
          </div>
        </div>
      </div>
    )
  }
}

