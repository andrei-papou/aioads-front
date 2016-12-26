import { AdvertActions } from '../actions';
import AnalyticsProvider from './base/analytics-provider';


export default class AdvertProvider extends AnalyticsProvider {

    constructor(dispatch) {
        super(dispatch);

        this.resourceUrl = 'advert-orders';
        this.getListAction = AdvertActions.GET_LIST;
        this.getObjectAction = AdvertActions.GET_OBJECT;
        this.getViewsDataAction = AdvertActions.GET_VIEWS_ANALYTICS;
        this.getClicksDataAction = AdvertActions.GET_CLICKS_ANALYTICS;
    }

}
