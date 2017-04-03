import React from 'react';
import ListItem from './ListItem';

export default class List extends React.Component {
  render() {
    return (
  		<div className='list-group'>
     		{this.props.items.map((item, i) => (
				<ListItem
					date={item.date}
					description={item.description}
					id={item.id}
					key={i}
					thumbnail={item.thumbnail}
					title={item.title}
					slug={item.slug}
				/>
     		))}
    	</div>
    );
  }
}