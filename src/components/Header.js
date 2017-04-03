import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
  		<header>
  			<nav className="navbar navbar-inverse">
				<div className="navbar-header"> 
					<div className="header-brand text-center">
            <Link to='/'>
	     			 My YouTube Playlist
            </Link>
	     		</div>
				</div>
  			</nav>
    	</header>
    );
  }
}

