import { AsyncStorage } from 'react-native';
import moment from 'moment';

export const moveFirstToLast = (arr) => {
    const first = arr.shift();
    arr[arr.length] = first;
    return arr;
};

/**
 * @param {number} ms
 * @param {Promise} promise
 * @return {Promise}
 */
const PromiseTimeout = (ms, promise) =>
  new Promise((resolve, reject) => {
      setTimeout(() => {
          reject(`Timeout`);
      }, ms);
      promise.then(resolve, reject);
  });

/**
 * @param {String} url
 * @param {Object} options
 * @param {number} timeout
 * @return {Promise}
 */
export const fetchTimeout = (url, options, timeout) =>
  PromiseTimeout(timeout,
    fetch(url, options),
  );

/**
 * Saves value to the local storage identifying it with token
 * @param {String} token
 * @param {String} value
 */
export const saveToLocalStorage = async (token, value) => {
    if (typeof value === `number`) {
        value = String(value);
    } else if (typeof value === `object`) {
        value = JSON.stringify(value);
    }

    try {
        await AsyncStorage.setItem(token, value);
        console.log(`Saved ${token}`, value);
    } catch (err) {
        console.warn(`Couldn't save ${token} of value ${value}`, err);
    }
};

/**
 * Dynamically get a concatenated list of urlencoded parameters as an URL
 * @param {Object} params
 * @return {String}
 */
export const formatToUrlEncoded = params =>
  Object.keys(params).map(key =>
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
  ).join(`&`);

/**
 * @param {number} date
 * @return {number} unix timestamp
 */
export const unix = date =>
  Math.floor(new Date(date) / 1000);

/**
 * Empty function
 */
export const noop = () => {};

/**
 * Randomly simulate network failures.
 * @return {boolean} always false if chanceOfFailure = 0
 */
const isNetworkFailure = () => {
    const chanceOfFailure = 0;  // 0..1
    return Math.random() < chanceOfFailure;
};

/**
 * Simulates a short delay and then returns a provided value or failure
 * @param {Function} getValue
 * @return {Promise}
 */
export const makeSimulatedNetworkRequest = (getValue) => {
    const durationMs = Math.floor(Math.random() * 500) + 250;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNetworkFailure()) {
                reject(new Error(`Network failure`));
            } else {
                getValue(resolve, reject);
            }
        }, durationMs);
    });
};

export const getMonthList = () =>
  moment.months();

export const getCurrentMonth = () =>
  getMonthList()[moment().months()];

/**
 * Fetch a list of jobs for the logged in user
 */
const fetchUserJobs = () => makeSimulatedNetworkRequest((resolve, reject) => {
    resolve(backendStateForTodoJobs.jobs);
});
