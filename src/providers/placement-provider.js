import { PlacementActions } from '../actions';
import AnalyticsProvider from './base/analytics-provider';


export default class PlacementProvider extends AnalyticsProvider {

    constructor(dispatch) {
        super(dispatch);

        this.resourceUrl = 'placements';
        this.getListAction = PlacementActions.GET_LIST;
        this.getObjectAction = PlacementActions.GET_OBJECT;
        this.getViewsDataAction = PlacementActions.GET_VIEWS_ANALYTICS;
        this.getClicksDataAction = PlacementActions.GET_CLICKS_ANALYTICS;
    }

}
