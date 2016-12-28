import { API_URL } from '../../config';
import DataProvider from './data-provider';


export default class AnalyticsProvider extends DataProvider {

    constructor(dispatch) {
        super(dispatch);

        this.clicksMapping = {
            year: this.getYearClicksData.bind(this),
            month: this.getMonthClicksData.bind(this),
            day: this.getDayClicksData.bind(this)
        };
        this.viewsMapping = {
            year: this.getYearViewsData.bind(this),
            month: this.getMonthViewsData.bind(this),
            day: this.getDayViewsData.bind(this)
        };
    }

    getRanges() {
        const now = new Date();
        const yearRange = [];
        for (let i = now.getYear() + 1890; i <= now.getYear() + 1900; ++i) yearRange.push(i);

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

        year = year || (new Date().getYear() + 1900);
        return fetch(`${API_URL}${this.resourceUrl}/${id}/year-clicks?year=${year}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

    getMonthClicksData(id, year, month) {
        this.checkInvariant('fetch clicks data', 'getClicksDataAction');

        const now = new Date();
        year = year || (now.getYear() + 1900);
        month = month || now.getMonth();
        return fetch(`${API_URL}${this.resourceUrl}/${id}/month-clicks?year=${year}&month=${month}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

    getDayClicksData(id, year, month, day) {
        this.checkInvariant('fetch clicks data', 'getClicksDataAction');

        const now = new Date();
        year = year || (now.getYear() + 1900);
        month = month || now.getMonth();
        day = day || now.getDay();

        return fetch(`${API_URL}${this.resourceUrl}/${id}/month-clicks?year=${year}&month=${month}&day=${day}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getClicksDataAction,
                data: json
            }));
    }

    getYearViewsData(id, year) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        year = year || (new Date().getYear() + 1900);
        return fetch(`${API_URL}${this.resourceUrl}/${id}/year-views?year=${year}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

    getMonthViewsData(id, year, month) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        const now = new Date();
        year = year || (now.getYear() + 1900);
        month = month || now.getMonth();
        return fetch(`${API_URL}${this.resourceUrl}/${id}/month-views?year=${year}&month=${month}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

    getDayViewsData(id, year, month, day) {
        this.checkInvariant('fetch views data', 'getViewsDataAction');

        const now = new Date();
        year = year || (now.getYear() + 1900);
        month = month || now.getMonth();
        day = day || now.getDay();

        return fetch(`${API_URL}${this.resourceUrl}/${id}/month-views?year=${year}&month=${month}&day=${day}`, {headers: this.headers})
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: this.getViewsDataAction,
                data: json
            }));
    }

}
