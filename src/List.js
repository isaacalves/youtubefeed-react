import React from 'react';
import ListItem from './ListItem';

export default class List extends React.Component {
  render() {
    return (
  		<div className='list-group'>
     		{this.props.items.map((item, i) => (
				<ListItem
					key={i}
					title={item.snippet.title}
					thumbnail={item.snippet.thumbnails.medium.url}
					publishedAt={item.snippet.publishedAt}
					description={item.snippet.description}
					videoId={item.contentDetails.videoId}
				/>
     		))}
    	</div>
    );
  }
}