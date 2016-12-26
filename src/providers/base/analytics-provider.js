import { API_URL } from '../../config';
import DataProvider from './data-provider';


export default class AnalyticsProvider extends DataProvider {

    constructor(dispatch) {
        super(dispatch);

        this.clicksMapping = {
            year: this.getYearClicksData,
            month: this.getMonthClicksData,
            day: this.getDayClicksData
        };
        this.viewsMapping = {
            year: this.getYearViewsData,
            month: this.getMonthViewsData,
            day: this.getDayViewsData
        };
    }

    getRanges() {
        const now = Date.now();
        const yearRange = [now.getYear() - 10, now.getYear()];

        const monthRange = [];
        for (let i = 1; i <= 12; ++i) monthRange.push(i);

        const dayRange = [];
        for (let i = 1; i <= now.getDay(); ++i) dayRange.push(i);

        return {
            year: yearRange,
            month: monthRange,
            day: dayRange
        };
    }

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

    getDayClicksData(id, year, month, day) {
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

    getYearViewsData(id, year) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        year = year || Date.now().getYear();
        return fetch(`${API_URL}${resourceUrl}/${id}/year-views?year=${year}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

    getMonthViewsData(id, year, month) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        const now = Date.now();
        year = year || now.getYear();
        month = month || now.getMonth();
        return fetch(`${API_URL}${resourceUrl}/${id}/month-views?year=${year}&month=${month}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

    getDayViewsData(id, year, month, day) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        const now = Date.now();
        year = year || now.getYear();
        month = month || now.getMonth();
        day = day || now.getDay();

        return fetch(`${API_URL}${resourceUrl}/${id}/month-views?year=${year}&month=${month}&day=${day}`)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

}
