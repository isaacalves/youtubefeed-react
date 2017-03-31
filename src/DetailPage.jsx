import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class DetailPage extends Component {
  render() {
    const { videoProps } = this.props.location.state;

    return (
      <div>
        <Link to='/'>Back</Link>
        <div className='item-detail'>
          <h1 className='title'>{videoProps.title}</h1>
          <div>
            
          </div>
          <div className='date'>{videoProps.publishedAt}</div>
          <div className='description'>{videoProps.description}</div>
        </div>
      </div>
    )
  }
}