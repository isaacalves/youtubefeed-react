import React from 'react';
import ListItem from './ListItem';

export default class List extends React.Component {
  render() {
    return (
  		<div className='list-group'>
     		{this.props.items.map((item, i) => (
				<ListItem
					key={i}
					title={item.title}
					thumbnail={item.thumbnail}
					date={item.date}
					description={item.description}
					id={item.id}
				/>
     		))}
    	</div>
    );
  }
}