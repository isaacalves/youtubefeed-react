import React from 'react';

export default class Pagination extends React.Component {
  render() {
    return (
			<div className='pagination text-center'>
				<a className='btn' disabled={!this.props.prevPageToken} onClick={this.props.prevPageHandler} >
					Previous
				</a>
				<a className='btn' disabled={!this.props.nextPageToken} onClick={this.props.nextPageHandler} >
					Next
				</a>
			</div>
    );
  }
}