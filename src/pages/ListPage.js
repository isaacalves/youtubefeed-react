import React from 'react';
import List from '../components/List'

const ListPage = ({ items }) => {
  return (
    <div className='page list-page'>
      <div className='page-content'>
        <List items={items}>
        </List>
      </div>
    </div>
  )
}

export default ListPage;