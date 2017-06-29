/**
* @providesModule skydreamer/utils/firebase
*/

import RNFirebase from 'react-native-firebase';

RNFirebase.prototype.convertObjectToArray = (object) => {
    const arr = [];
    for(var key in object) {
        const obj = object[key];
        obj.key = key;
        arr.push(obj);
    }
    return arr;
};

export default RNFirebase.initializeApp({
    debug: false,
    persistence: false
});
