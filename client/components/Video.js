import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Users from './Users';
import * as todosAction from '../actions/todosAction';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videoId: 0,
      poster: [],
    };
  }
  componentWillMount() {
    // load video resources from here
    this.Lvideos = [
      'video/ooxx_0001.mp4',
      'video/ooxx_0002.mp4',
      'video/ooxx_0003.mp4',
      'video/ooxx_0004.mp4',
    ];
    this.setState({
      videos: [
        'video/ooxx_0001.mp4',
        'video/ooxx_0002.mp4',
        'video/ooxx_0003.mp4',
        'video/ooxx_0004.mp4',
      ],
    });
  }
  componentDidMount() {
    // this.myvid = document.getElementById('myvideo');
    this.myvideo.addEventListener('ended', () => {
      this.setState({
        videoId: this.state.videoId + 1,
      });
      this.myvideo.src = this.Lvideos[this.state.videoId % this.Lvideos.length];
      this.myvideo.play();
    });
  }
  showVideo(id) {
    this.setState({
      videoId: id,
    }, this.reloadVideo);
  }
  reloadVideo() {
     // var myvideo = document.getElementById('myvideoeo');
    this.myvideo.src = this.Lvideos[this.state.videoId];
    this.myvideo.play();
  }
  render() {
    const styles = {
      width: '1080px',
      height: '720px',
    };
    const playList = this.Lvideos.map((items, index) =>
      <li><button onClick={this.showVideo.bind(this, index)}>{index + 1}</button></li>,
    );
    const A = Array.from({ length: 10 });
    const AAA = A.map(item =>
      <Users id={item} />,
    );
    return (
      <div>
        <h1><Link to="/users/AACSDCA">Video</Link></h1>
        <video
          ref={(c) => { this.myvideo = c; }}
          src={this.Lvideos[0]}
          style={styles} controls
        />
        <ul>
          {playList}
        </ul>
        {AAA}
      </div>
    );
  }
}
export default Video;

