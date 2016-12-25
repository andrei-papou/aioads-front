import { AdvertActions } from '../actions';


const _defaultState = {
    list: [],
    obj: {},
    analyticsClicks: {},
    analyticsViews: {}
};


export default function adverts(state = DEFAULT_STATE, action) {

    switch (action.type) {

        case AdvertActions.GET_LIST:
            return { ...state, list: action.data };

        case AdvertActions.GET_OBJECT:
            return { ...state, object: action.data };

        case AdvertActions.GET_CLICKS_ANALYTICS:
            return { ...state, analyticsClicks: action.data };

        case AdvertActions.GET_VIEWS_ANALYTICS:
            return { ...state, analyticsViews: action.data };

        default:
            return state;

    }

}
