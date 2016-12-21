import { API_URL } from '../../config';
import Provider from './provider';


export default class DataProvider extends Provider {

    checkInvariant(action, ...properties) {
        for (let propName of properties) {
            if (!this[propName]) throw new Error(`${propName} should be defined to ${action}`);
        }
    }

    getList() {
        this.checkInvariant('fetch list data', 'resourceUrl', 'getListAction');

        return fetch(`${API_URL}${this.resourceUrl}`, {
            headers: this.headers
        })
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getListAction,
                data: json
            }));
    }

}
