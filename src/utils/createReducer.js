/**
* @providesModule skydreamer/utils/createReducer
*/

export default (initialState, handlers) => {
    return (state = initialState, action) => {
        if(handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
};
