import React from 'react';

export default class Pagination extends React.Component {
  render() {
  	// const previousButtonVisibility = this.props.prevPageToken ? 'visible' : 'hidden';
  	// const nextButtonVisibility = this.props.nextPageToken ? 'visible' : 'hidden';

    return (
		<div className='pagination text-center'>
			<div
				className={!this.props.prevPageToken ? 'btn btn--disabled' : 'btn'}
				onClick={this.props.prevPageHandler}>
					Previous
			</div>
			<div
				className={!this.props.nextPageToken ? 'btn btn--disabled' : 'btn'}
				onClick={this.props.nextPageHandler}>
					Next
			</div>
		</div>
    );
  }
}