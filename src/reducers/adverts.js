import { DEFAULT_STATE } from '../config';
import { AdvertActions } from '../actions';


export default function adverts(state = DEFAULT_STATE, action) {

    switch (action.type) {

        case AdvertActions.GET_LIST:
            return { ...state, list: action.data };

        case AdvertActions.GET_OBJECT:
            return { ...state, object: action.data };

        default:
            return state;

    }
}
