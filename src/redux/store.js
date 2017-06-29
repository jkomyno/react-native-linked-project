/**
* @providesModule skydreamer/redux/store
*/

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import reducers from 'skydreamer/redux/reducers';
import {
    createStore,
    applyMiddleware
} from 'redux';

const logger = createLogger();
export default createStore(
    reducers,
    applyMiddleware(thunk, logger)
);
