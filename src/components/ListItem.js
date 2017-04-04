import React from 'react';
import { Link } from 'react-router-dom'

export default class ListItem extends React.Component {
	
  render() {  	
    return (
  		<div className='list-group-item'>
  			<div className='container-fluid'>
  				<div className='row no-gutter'>
  					<div className='col-sm-6 col-sm-push-6'>
  						<div className='list-group-item__info'>
	  						<Link
	  							to={`/detail/${this.props.slug}`}
		  					>
				  				<h1 className='title'>{this.props.title}</h1>
				  			</Link>
				  			<p className='date'>Published on { this.props.date }</p>
				  			<div className='description'>{this.props.description}</div>
				  		</div>
			  		</div>
			  		<div className='col-sm-6 col-sm-pull-6'>	
							<div className='list-group-item__thumbnail'>
								<Link
									to={`/detail/${this.props.slug}`}

									//passing all props here
									//but what to do if navigating directly to /detail from the url?
									// to={{
									// 	pathname: '/detail/'+this.props.slug ,
									// 	state: { videoProps: this.props }
									// }}
									
									// passing only the id
									// but can't access the whole items object on detail page
									// to={'/detail/'+this.props.id }
								>
									<img src={this.props.thumbnail} alt='' />
									<div className='overlay aligner'>
										<div className='aligner-item'>
											<div className='overlay__icon'>+</div>
											{
												// please find a better way to commend jsx code
												// <i className='fa fa-plus-circle'></i>
											}
										</div>
									</div>
								</Link>
							</div>  		
						</div>
  				</div>
  			</div>
  		</div>	
    );
  }
}


