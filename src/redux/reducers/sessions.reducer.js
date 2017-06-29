import createReducer from 'skydreamer/utils/createReducer';

import {
    SET_SESSION,
    SELECT_SESSION,
    APPEND_CHAT_MESSAGE,
    PREPEND_CHAT_MESSAGES
} from 'skydreamer/redux/actions/types';

const initialState = {
    selected: null,
    collection: { }, // Load @ startup
    messages: { } // Load progressively
};

export default createReducer(initialState, {
    [SET_SESSION](prevState, action) {
        const collection = { ...prevState.collection };
        var session = collection[action.key] || { };
        var usersTyping = session.usersTyping || { };
        session = { ...session, ...action.value, usersTyping: { ...usersTyping } };
        session.usersTyping = action.value.usersTyping;
        session.key = action.key;
        collection[action.key] = session;
        return { ...prevState, collection };
    },
    [SELECT_SESSION](prevState, action) {
        return { ...prevState, selected: action.value };
    },
    [PREPEND_CHAT_MESSAGES](prevState, action) {
        const messages = { ...prevState.messages };
        var thread = messages[action.key] ? messages[action.key].slice() : [];
        thread = action.messages.concat(thread);
        messages[action.key] = thread;
        return { ...prevState, messages };
    },
    [APPEND_CHAT_MESSAGE](prevState, action) {
        const messages = { ...prevState.messages };
        var thread = messages[action.key] ? messages[action.key].slice() : [];
        thread = thread.concat(action.message);
        messages[action.key] = thread;
        return { ...prevState, messages };
    }
});
