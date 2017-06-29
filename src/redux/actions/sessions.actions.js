import Debug from 'skydreamer/utils/debugger';
import backend from 'skydreamer/utils/backend';
import firebase from 'skydreamer/utils/firebase';
import { Actions } from 'react-native-router-flux';
import {
    SET_SESSION,
    SELECT_SESSION,
    PREPEND_CHAT_MESSAGES,
    APPEND_CHAT_MESSAGE
} from 'skydreamer/redux/actions/types';

const messageHandlers = {};
const sessionHandlers = {};

export const fetchMessages = (session, lastMessage, count=25) => (dispatch) => {
    return new Promise((resolve) => {
        const { lastFetchCount }  = session;
        if(lastFetchCount && lastFetchCount < count) return;
        var ref = firebase.database().ref(`user-messages/${session.key}`);
        if(lastMessage) ref = ref.endAt(lastMessage.timestamp);
        ref = ref.limitToLast(count);
        ref.once(`value`, (snapshot) => {
            const data = snapshot.val();
            var messages = firebase.convertObjectToArray(data);
            messages = messages.sort((a, b) => a.timestamp - b.timestamp);
            const fetchCount = messages.length;
            if(lastMessage && messages.count > 1) messages = messages.slice(0, -1);
            dispatch({ type: SET_SESSION, key: session.key, value: { ...session, lastFetchCount: fetchCount } });
            dispatch({ type: PREPEND_CHAT_MESSAGES, key: session.key, messages });

            if(!messageHandlers[session.key]) {
                let hack = false;
                messageHandlers[session.key] = firebase.database().ref(`user-messages/${session.key}`).orderByChild(`timestamp`).limitToLast(1).on(`child_added`, (snapshot) => {
                    if(hack) { return hack = false; }
                    const message = snapshot.val();
                    message.key = snapshot.key;
                    dispatch({ type: APPEND_CHAT_MESSAGE, key: session.key, message });
                });
            }
            return resolve();
        });
    });
};

// dispatch is not used directly here, because it results in dispatch being called in the
// messageHandler defined in syncSessions
export const sendMessage = (session, content, type=`text`) => (dispatch) => { //eslint-disable-line no-unused-vars
    const { uid } = firebase.auth().currentUser;
    const data = {
        channel: session,
        timestamp: { '.sv': `timestamp` },
        userid: uid,
        objData: {
            type,
            value: content
        }
    };

    firebase.database().ref(`user-messages/${session}`).push(data);
};


export const syncSessions = () => (dispatch) => {
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`user-channels/${uid}`);

    const handler = (snapshot) => {
        const sessionId = snapshot.key;
        if(sessionHandlers[sessionId]) return;

        sessionHandlers[sessionId] = firebase.database().ref(`channels/${sessionId}`).on(`value`, (snapshot) => {
            dispatch({ type: SET_SESSION, key: sessionId, value: snapshot.val() });
        });
    };

    ref.on(`child_added`, handler);
    ref.on(`child_changed`, handler);
};

export const selectSession = (key) => (dispatch) => {
    dispatch({ type: SELECT_SESSION, value: key });
};


export const openChat = (key) => (dispatch) => {
    dispatch({ type: SELECT_SESSION, value: key });
    Actions.messenger();
};

export const startTyping = (key) => async (dispatch) => { //eslint-disable-line no-unused-vars
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`channels/${key}/usersTyping/${uid}`);
    ref.set(true);
};

export const stopTyping = (key) => (dispatch) => { //eslint-disable-line no-unused-vars
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`channels/${key}/usersTyping/${uid}`);
    ref.remove();
};
