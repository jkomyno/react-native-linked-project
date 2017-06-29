/**
* @providesModule skydreamer/utils/backend
*/

/* eslint-disable camelcase */

import axios from 'axios';
import store from 'skydreamer/redux/store';

const GET = `get`;
const POST = `post`;
const PUT = `put`;

class Backend {

    constructor() {
        this.instance = axios.create({
            baseURL: `https://api.skydreamer.io`,
            timeout: 15000
        });
        this.request = this.request.bind(this);
        this.fetchSwipeCards = this.fetchSwipeCards.bind(this);
        this.approveSwipeCardOffer = this.approveSwipeCardOffer.bind(this);
        this.declineSwipeCardOffer = this.declineSwipeCardOffer.bind(this);
    }

    request(options) {
        const { instance } = this;
        instance.defaults.headers.common[`Authorization`] = store.getState().user.authToken;
        return new Promise((resolve, reject) => {
            instance[options.method](options.path, options.body).then((response) => {
                const { data } = response;
                if(data.success) return resolve(data.data);
                return reject(data.message);
            }).catch((error) => {
                console.log(`heyy`, err);
                return reject(error);
            });
        });
    }

    authenticate() {
        const { firebaseUid, authToken } = store.getState().user;
        return axios.post(`https://api.skydreamer.io/auth/upSertToken`, {
            id_firebase: firebaseUid,
            token: authToken
        });
    }

    signIn(body) {
        const { request } = this;
        return request({
            method: POST,
            path: `/users/signIn`,
            body
        });
    }

    fetchSwipeCards(page, travelId) {
        const { request } = this;
        const travel_id = travelId || 1;
        // return request({
        //     method: POST,
        //     path: `/cards/get`,
        //     body: { travel_id, page }
        // });

        this.instance.defaults.headers.common[`Authorization`] = store.getState().user.authToken;
        this.instance.defaults.headers.common[`Content-Type`] = `application/json`;
        return new Promise((resolve, reject) => {
            this.instance.post(`/cards/get`, { travel_id, page })
                .then((response) => {
                    const { data } = response;
                    if(!data.success) return reject(data.message);
                    const { cards } = data.data;
                    // cards.forEach((card) => {
                    //     card.homeaway = {
                    //         headline: `Studio Paris-Montmartre. Parisian romanticism.`,
                    //         description: `Idealy located, Tastefully decorated, Completely renovated`,
                    //         images: [`http://placehold.it/128`, `http://placehold.it/256`, `http://placehold.it/512`]
                    //     };
                    // });

                    return resolve(data.data);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }

    approveSwipeCardOffer(card_id, travel_id = 1, ) {
        const { request } = this;
        return request({
            method: POST,
            path: `/cards/like`,
            body: { travel_id, card_id }
        });
    }

    declineSwipeCardOffer(card_id, travel_id = 1) {
        const { request } = this;
        return request({
            method: POST,
            path: `/cards/dislike`,
            body: { travel_id, card_id }
        });
    }

    loadUser(id) {
        const { request } = this;
        return request({
            method: POST,
            path: `/users/profile`,
            body: { user_id: id }
        });
    }

    fetchUserSessions(travel_id) {
        const { request } = this;
        return request({
            method: POST,
            path: `/cards/sessions/get`,
            body: {
                current_travel_id: 1 // TODO : use travel_id
            }
        });
    }
    fetchBuddies(travel_id) {
        const { request } = this;
        return request({
            method: POST,
            path: `/buddies/get`,
            body: {
                travel_id: travel_id || 1,
                limit: 10,
                users_group_limit :15
            }
        });
    }
}

export default new Backend();
