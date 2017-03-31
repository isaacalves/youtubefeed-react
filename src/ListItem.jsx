import React from 'react';

export default class ListItem extends React.Component {
	
  render() {  	
    return (
  		<div className='list-group-item'>
			<a href='#'>
				<div className='thumbnail'>
					<img src={this.props.thumbnail} alt='' />
				</div>  		
			</a>
			<a href='#'>
  				<h1 className='title'>{this.props.title}</h1>
  			</a>
  			<div className='date'>{this.props.publishedAt}</div>
  			<div className='description'>{this.props.description}</div>
  		</div>	
    );
  }
}


