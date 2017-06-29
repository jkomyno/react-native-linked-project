import Debug from 'skydreamer/utils/debugger';
import backend from 'skydreamer/utils/backend';
import firebase from 'skydreamer/utils/firebase';
import {
    SET_USER,
    FETCH_USER_BUDDIES,
    ADD_PHOTO_LINK,
    SET_TRAVEL_ID
} from 'skydreamer/redux/actions/types';


export const loadProfile = (id, remote=false) => async (dispatch) => {
    try {
        const response = await backend.loadUser(id, remote);
        console.warn(JSON.stringify(response, null, 2));
        dispatch({ type: SET_USER, remote, value: response });
    } catch (e) {
        Debug.error(e);
    }
};

export const openSettings = () => (dispatch) => {
};

export const fetchProfilePhoto = (id) => async (dispatch) => {
    const ref = firebase.database().ref(`user-pictures/${id}`);
    const snapshot = await ref.once(`value`);
    var url = snapshot.val();
    if(!url) url = `http://placehold.it/64`;
    dispatch({ type: ADD_PHOTO_LINK, key: id, url });
};

export const fetchBuddies = (travel_id) => async (dispacth) => {
    try {
        const buddiesResponse = await backend.fetchBuddies(travel_id);
        dispacth({ type: FETCH_USER_BUDDIES, buddiesData: buddiesResponse});
    } catch(e) {
        Debug.error(e);
    }
};


export const setTravelId = (travel_id) => (dispatch) => {
    dispatch({ type: SET_TRAVEL_ID, travel_id});
};
