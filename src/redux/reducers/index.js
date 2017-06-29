/**
* @providesModule skydreamer/redux/reducers
*/

import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import cardDeckReducer from './carddeck.reducer';
import swipeCardsReducer from './swipecards.reducer';
import sessionReducer from './sessions.reducer';
import cacheReducer from './cache.reducer';

export default combineReducers({
    user: userReducer,
    cardDeck: cardDeckReducer,
    swipeCards: swipeCardsReducer,
    sessions: sessionReducer,
    cache: cacheReducer
});
