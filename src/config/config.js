/**
 * Author: Alberto Schiabel
 * Purpose: Centralization of every technical aspect of the app
 * Date: 07 March 2017
 *
 * Calling the api root url from here instead of separately calling it
 * from different methods can avoid distraction errors. Also, e.g.  you
 * wouldn't want to have separate timeout parameters for every HTTP call
 * that your methods perform, would you?
 */

const config = {
  api: {
    rootUrl: 'https://api.skydreamer.io',
    timeout: 50000, // ms
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuc2t5ZHJlYW1lci5pbyIsImF1ZCI6Imh0dHA6XC9cL3d3dy5za3lkcmVhbWVyLmlvIiwiaWF0IjoxNDg2ODI0NjUwfQ.kjUuhTLH38V-P_Jt8KbCxIBYPTO5aIG37oCzgSw92u8',
  },
  localStorage: {
    fileName: 'skydreamer_dump',
  },
};

export default config;
