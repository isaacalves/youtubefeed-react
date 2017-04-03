import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      description: '',
      id: '',
      slug: '',
      title: '',
    };
  }

  componentWillMount() {
    // console.log('componentWillMount');
    // console.log(this.props);

    // if navigation directly (there will be no state), go to home
    if (this.props.location.state === undefined){
      this.props.history.replace('/');
    }
  }

  componentDidMount() {
    //console.log('componentDidMount');

    if (this.props.location.state !== undefined){
      let { title, date, id, description } = this.props.location.state.videoProps;

      this.setState({
        date: date,
        description: description,
        id: id,
        title: title,
      })
    }else{
      // need to access parent's items
      console.log('no location');
      console.log('this.props.test: ', this.props.test);
    }
  }

  render() {
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }

    const slug = this.props.match.params.slug;
    // console.log(slug);
    
    // console.log('this.props: ', this.props);
    console.log('this.props: ', this.props);

    //console.log(this.props.route); //why not
    
    // obs: this view gets rendered twice if loaded directly from the url (once again after data is fetched)

    // obs (layout): video in col-sm-6 doesn't look good so I left col-xs-12
    
    return (
      <div className='page detail-page'>
        <div className='page-content'>
          <div className='container-fluid'>
            <Link to='/'>&larr; Back to list of videos</Link>
            <div className='item-detail'>
              <div className='row'>
                <div className='col-xs-12'>
                  <h1 className='title'>{this.state.title}</h1>          
                  <div className='date strong'>Published on {this.state.date}</div>
                </div>
                <div className='col-xs-12'>
                  <div className='responsive-embed-youtube'>
                    <YouTube
                      videoId={this.state.id}
                      opts={videoOptions}
                    ></YouTube>
                  </div>
                </div>
                <div className='col-xs-12'>
                  <div className='description'>{this.state.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}