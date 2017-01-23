import Provider from './base/provider';
import { API_URL, TOKEN_KEY } from '../config';
import { UserActions } from '../actions';


const LOGIN_URL = 'login';
const GET_USER_DATA_URL = 'account-data';
const AD_PLACER_SIGNUP_URL = 'signup-ad-placer';
const AD_PROVIDER_SIGNUP_URL = 'signup-ad-provider';


export default class AuthProvider extends Provider {

    _saveToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    _signup(data, url) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => {
                const token = json.token;
                this._saveToken(token);
                return this.getAccountData(token);
            });
    }

    getAccountData(authToken) {
        const token = authToken || localStorage.getItem(TOKEN_KEY);
        if (!token || token === 'undefined') return Promise.resolve(false);
        return fetch(`${API_URL}${GET_USER_DATA_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => this.dispatch({
                type: UserActions.LOGIN,
                data: json
            }))
    }

    login(data) {
        return fetch(`${API_URL}${LOGIN_URL}`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => Promise.all([response, response.json()]))
            .then(([response, json]) => this.checkError(response, json))
            .then(json => {
                const token = json.token;
                this._saveToken(token);
                return this.getAccountData(token);
            });
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        this.dispatch({ type: UserActions.LOGOUT });
    }

    signupAdPlacer(data) {
        return this._signup(data, `${API_URL}${AD_PLACER_SIGNUP_URL}`);
    }

    signupAdProvider(data) {
        return this._signup(data, `${API_URL}${AD_PROVIDER_SIGNUP_URL}`);
    }

}
