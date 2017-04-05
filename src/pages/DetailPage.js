import React from 'react';
// import { Link } from 'react-router';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

const DetailPage = ({ item }) => {
  // console.log('DetailPage render');
  const videoOptions = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  }
  return (
    <div className='page detail-page'>
      <div className='page-content'>
        <div className='container-fluid'>
          <Link to='/'>&larr; Back to list of videos</Link>
          <div className='item-detail'>
            <div className='row'>
              <div className='col-xs-12'>
                <h1 className='title'>{item.title}</h1>          
                <p className='date'>Published on {item.date}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='responsive-embed-youtube'>
                  <YouTube
                    videoId={item.id}
                    opts={videoOptions}
                  ></YouTube>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='description'>{item.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage;
