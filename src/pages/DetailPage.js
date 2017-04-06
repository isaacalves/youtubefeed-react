import React from 'react';
// import { Link } from 'react-router';
import { Link } from 'react-router-dom';
import Item from '../components/Item'

const DetailPage = ({ item }) => {
  // console.log('DetailPage render');
  return (
    <div className='page detail-page'>
      <div className='page-content'>
        <div className='container-fluid'>
          <Link to='/'>&larr; Back to list of videos</Link>
          <Item
            date={item.date}
            description={item.description}
            title={item.title}
            videoId={item.id}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailPage;
