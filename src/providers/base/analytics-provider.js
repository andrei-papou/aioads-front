import { API_URL } from '../../config';
import DataProvider from './data-provider';


export default class AnalyticsProvider extends DataProvider {

    getYearClicksData(id, year) {
        this.checkInvariant('fetch clicks data', 'getClicksDataAction');

        year = year || Date.now().getYear();
        return fetch(`${API_URL}${resourceUrl}/${id}/year-clicks?year=${year}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

    getMonthClicksData(id, year, month) {
        this.checkInvariant('fetch clicks data', 'getClicksDataAction');

        const now = Date.now();
        year = year || now.getYear();
        month = month || now.getMonth();
        return fetch(`${API_URL}${resourceUrl}/${id}/month-clicks?year=${year}&month=${month}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

    getDayClicksDate(id, year, month, day) {
        this.checkInvariant('fetch clicks data', 'getClicksDataAction');

        const now = Date.now();
        year = year || now.getYear();
        month = month || now.getMonth();
        day = day || now.getDay();

        return fetch(`${API_URL}${resourceUrl}/${id}/month-clicks?year=${year}&month=${month}&day=${day}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

}
