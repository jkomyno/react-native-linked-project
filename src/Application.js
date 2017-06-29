/**
* @providesModule skydreamer/Application
*/

import React from 'react';
import { Provider } from 'react-redux';
import store from 'skydreamer/redux/store';
import Router from 'skydreamer/Router';

export default () => (
    <Provider store={store}>
        <Router />
    </Provider>
);
