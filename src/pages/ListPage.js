import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import List from '../components/List'

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='page list-page'>
        <div className='page-content'>
          <List items={this.props.items}>
          </List>
        </div>
      </div>
    )
  }
}

// cannot use stateless components because using 'this'. even though not using state
// how would I pass items to the List otherwise?

// const ListPage = () => {
//   return (
//     <div className='page list-page'>
//       <div className='page-content'>
//         <List items={this.props.items}>
//         </List>
//       </div>
//     </div>
//   )
// }

// export default ListPage;