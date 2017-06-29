import Debug from 'skydreamer/utils/debugger';
import backend from 'skydreamer/utils/backend';
import { Actions } from 'react-native-router-flux';
import {
    SET_SWIPECARD_FETCHING,
    SET_SWIPECARD_EMPTY,
    POP_SWIPECARD,
    APPEND_SWIPECARDS,
    USER_SESSIONS_FETCHING,
    USER_SESSIONS_SUCCESS,
    RESET_SWIPECARDS
} from 'skydreamer/redux/actions/types';

export const onOfferApproved = (card) => async (dispatch) => {
    Debug.log(`Offer approved`, card);
    dispatch({ type: POP_SWIPECARD, id: card.card_id });
    if(card.isMatch) {
        Actions.match({card});
    }
    const approvedResponse = await backend.approveSwipeCardOffer(card.card_id);
    console.log(`offer`, approvedResponse);
};

export const onOfferDeclined = (card) => async (dispatch) => {
    dispatch({ type: POP_SWIPECARD, id: card.card_id });
    const declined = await backend.declineSwipeCardOffer(card.card_id);
    console.log(`offer`, declined);
    Debug.log(`Offer declined`);
};

export const fetchCards = (page, travel_id, shouldResetStack) => async (dispatch) => {
    Debug.log(`Start fetch cards PAGE ${page}`);
    try {
        dispatch({ type: SET_SWIPECARD_FETCHING, value: true });
        const fetchResponse = await backend.fetchSwipeCards(page, travel_id);
        const { cards, groupUsers } = fetchResponse;
        if (shouldResetStack) {
            dispatch({ type: RESET_SWIPECARDS, cards, groupUsers });
        } else {
            dispatch({ type: APPEND_SWIPECARDS, cards, groupUsers });
        }
        // dispatch({ type: APPEND_SWIPECARDS, cards, groupUsers });
        dispatch({ type: SET_SWIPECARD_EMPTY, value: cards && cards.length < 10 });
        dispatch({ type: SET_SWIPECARD_FETCHING, value: false });
    } catch (e) {
        Debug.error(e); // TODO: Error handling
        dispatch({ type: SET_SWIPECARD_FETCHING, value: false });
    }
};

export const fetchUserSessions = (travel_id) => async (dispatch) => {
    Debug.log(`Start fetching user sessions`);
    try {
        dispatch({ type: USER_SESSIONS_FETCHING, value: true });
        const userSessions = await backend.fetchUserSessions(travel_id);
        dispatch({ type: USER_SESSIONS_SUCCESS, data: userSessions });
        dispatch({ type: USER_SESSIONS_FETCHING, value: false });
    } catch(e) {
        Debug.error(e);
        dispatch({ type: USER_SESSIONS_FETCHING, value: false });
    }
};
