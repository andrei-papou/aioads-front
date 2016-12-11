import Provider from './base/provider';
import { API_URL } from '../config';
import { UserActions } from '../actions';

const LS_KEY = 'aioads-user-data';
const LOGIN_URL = 'login';
// const GET_USER_DATA_URL = 'auth/get-user';  // TODO: update this to actual url

export default class AuthProvider extends Provider {

    checkAuth(user) {
        if (!user.email) {
            const savedData = localStorage.getItem(LS_KEY);
            savedData && this.dispatch({
                type: UserActions.LOGIN,
                data: JSON.parse(savedData)
            });
        }
    }

    login(data) {
        return fetch(`${API_URL}${LOGIN_URL}`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => this.dispatch({
                type: UserActions.LOGIN,
                data: json
            }));
    }

}
