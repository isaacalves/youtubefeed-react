import React from 'react';
import { Link } from 'react-router-dom'

export default class ListItem extends React.Component {
	
  render() {  	
    return (
  		<div className='list-group-item'>
			<Link
				to={{
					pathname:'/detail',
					state: { videoProps: this.props }
				}}
			>
				<div className='thumbnail'>
					<img src={this.props.thumbnail} alt='' />
				</div>  		
			</Link>
			<Link to="/detail">
  				<h1 className='title'>{this.props.title}</h1>
  			</Link>
  			<div className='date'>{this.props.publishedAt}</div>
  			<div className='description'>{this.props.description}</div>
  		</div>	
    );
  }
}


