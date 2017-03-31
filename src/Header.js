import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
  		<header>
  			<nav className="navbar navbar-inverse">
				<div className="navbar-header"> 
					<div className="header-brand text-center">
	     			My YouTube Playlist
	     		</div>
				</div>
  			</nav>
    	</header>
    );
  }
}

