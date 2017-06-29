import Debug from 'skydreamer/utils/debugger';
import firebase from 'skydreamer/utils/firebase';
import backend from 'skydreamer/utils/backend';
import { Actions } from 'react-native-router-flux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import axios from 'axios';
import {
    SET_AUTH_STATE,
    SET_AUTH_TOKEN,
    SET_FIREBASE_ID,
    SELECT_SESSION
} from 'skydreamer/redux/actions/types';

export const startFacebookAuth = (onError) => async (dispatch) => {
    LoginManager.logInWithReadPermissions([`public_profile`, `email`, `public_profile`, `user_birthday`])
        .then((result) => {
            if(result.isCancelled) return Promise.reject(`cancelled`);
            return AccessToken.getCurrentAccessToken();
        })
        .then((data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        })
        .catch((error) => {
            return onError(error);
        });
};


const findFacebookProviderData = (providers) => {
    for(var i = 0; i < providers.length; i++) {
        const provider = providers[i];
        if(provider.providerId === `facebook.com`) return provider;
    }
};

export const onFirebaseAuthSuccess = (user) => (dispatch) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { uid } = user;
            const authToken = await user.getToken(false);

            dispatch({ type: SET_FIREBASE_ID, firebaseUid: uid });
            dispatch({ type: SET_AUTH_TOKEN, authToken });

            const authResponse = await backend.authenticate();
            const facebookProvider = findFacebookProviderData(user.providerData);

            const facebookId = facebookProvider.uid;
            const facebookTokenData = await AccessToken.getCurrentAccessToken();
            const facebookToken = facebookTokenData.accessToken.toString();

            const fbResponse = await axios.get(`https://graph.facebook.com/v2.5/me?access_token=${facebookToken}&fields=gender,birthday,first_name,last_name,email`);

            const { data } = fbResponse;
            const { first_name, last_name, gender, birthday, email } = data;
            const signInResponse = await backend.signIn({
                first_name,
                last_name,
                email,
                gender, // male female
                birthday,
                id_facebook: facebookId,
                id_firebase: uid,
                language: `EN`,
                latitude: 0,
                longitude: 0
            });

            dispatch({ type: SET_AUTH_STATE, authenticated: true, uid: authResponse.user_id });
            dispatch({ type: SELECT_SESSION, value: `viyYL3CQhQoeEI5BGZROOiJgzR3m` });
            Actions.rootTabController();

            firebase.messaging().getToken().then((token) => {
                firebase.database().ref(`fcm-tokens/${uid}`).set(token);
            });

            return resolve(authResponse.user_id);
        } catch (error) {
            firebase.auth().signOut();
            Debug.error(`TheError`, error);
            return reject(error);
        }
    });

};

export const onFirebaseAuthFailed = () => (dispatch) => {
    Debug.warn(`Firebase authentication failed`);
    dispatch({ type: SET_AUTH_STATE, authenticated: false });
    dispatch({ type: SET_FIREBASE_ID, firebaseUid: null });
    dispatch({ type: SET_AUTH_TOKEN, authToken: null });
    Actions.loginScreen();
};
