import React, { PropsTypes } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

class Profile extends React.Component {
  render() {
    return (
      <div className="ABC">
        <h1><Link to="/">Author name:{this.props.params.author} , text:{this.props.params.text}</Link></h1>
      </div>
    );
  }
}
export default Profile;
