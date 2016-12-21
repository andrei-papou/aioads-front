import { AdvertActions } from '../actions';
import DataProvider from './base/data-provider';


export default class AdvertProvider extends DataProvider {

    constructor(dispatch) {
        super(dispatch);

        this.resourceUrl = 'advert-orders';
        this.getListAction = AdvertActions.GET_LIST;
    }

}
