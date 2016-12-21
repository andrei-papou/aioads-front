import { UserActions } from '../actions';


const _defaultState = {};

export default function userReducer(state = _defaultState, action) {

    switch (action.type) {

        case UserActions.LOGIN:
            return action.data;

        case UserActions.LOGOUT:
            return _defaultState;

        default:
            return state;
    }
}
