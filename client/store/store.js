import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from '../reducers/';

const logger = createLogger();
const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(reducers, middleware);
export default store;
