import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'sweetalert2/dist/sweetalert2.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/base.scss';
import CommentBoxContainer from './containers/CommentBoxContainer';
import Video from './components/Video';
import Users from './components/Users';
import Profile from './components/Profile';
import Canvas from './components/Canvas';
import store from './store/store';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      text: '',
    };
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const app = document.getElementById('content');
render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={CommentBoxContainer}>{' '}</IndexRoute>
        <Route path="profile/:author/:text" component={Profile} />
        <Route path="video" component={Video} />
        <Route path="users/:userID" component={Users} />
        <Route path="canvas" component={Canvas} />
      </Route>
    </Router>
  </Provider>
), app);
