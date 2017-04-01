import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

//<Video from='youtube' videoId={videoId} />
export default class DetailPage extends Component {
  render() {
    const { videoProps } = this.props.location.state;

    console.log(videoProps);
    return (
      <div>
        <Link to='/'>Back</Link>
        <div className='item-detail'>
          <h1 className='title'>{videoProps.title}</h1>          
          <YouTube videoId={videoProps.id} ></YouTube>
          <div className='date'>{videoProps.publishedAt}</div>
          <div className='description'>{videoProps.description}</div>
        </div>
      </div>
    )
  }
}