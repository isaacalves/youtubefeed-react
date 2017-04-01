import React from 'react';
import { Link } from 'react-router-dom'

export default class ListItem extends React.Component {
	
  render() {  	
    return (
  		<div className='list-group-item'>
  			<div className='container-fluid'>
  				<div className='row no-gutter'>

  					<div className='col-sm-6 col-sm-push-6'>
  						<div className='list-group-item--info'>
	  						<Link to="/detail">
				  				<h1 className='title'>{this.props.title}</h1>
				  			</Link>
				  			<div className='date'>Published on { this.props.date }</div>
				  			<div className='description'>{this.props.description}</div>
				  		</div>
			  		</div>

			  		<div className='col-sm-6 col-sm-pull-6'>	
							<div className='list-group-item--thumbnail'>
								<Link
									to={{
										pathname:'/detail',
										state: { videoProps: this.props }
									}}
								>
									<img src={this.props.thumbnail} alt='' />
								</Link>
							</div>  		
						</div>

  				</div>
  			</div>
  		</div>	
    );
  }
}


