import createReducer from 'skydreamer/utils/createReducer';

import {
    ADD_PHOTO_LINK
} from 'skydreamer/redux/actions/types';

const initialState = {
    userPhotos: { }
};

export default createReducer(initialState, {
    [ADD_PHOTO_LINK](prevState, action) {
        const { key, url } = action;
        var userPhotos = { ...prevState.userPhotos };
        userPhotos[key] = url;
        return { ...prevState, userPhotos };
    }
});
