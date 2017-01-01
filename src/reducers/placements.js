import { PlacementActions } from '../actions';


const _defaultState = {
    list: [],
    obj: {},
    analyticsClicks: [],
    analyticsViews: []
};


export default function placements(state = _defaultState, action) {

    switch (action.type) {

        case PlacementActions.GET_LIST:
            return { ...state, list: action.data };

        case PlacementActions.GET_OBJECT:
            return { ...state, object: action.data };

        case PlacementActions.GET_CLICKS_ANALYTICS:
            return { ...state, analyticsClicks: action.data };

        case PlacementActions.GET_VIEWS_ANALYTICS:
            return { ...state, analyticsViews: action.data };

        default:
            return state;

    }

}
