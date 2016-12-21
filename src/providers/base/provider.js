import { TOKEN_KEY } from '../../config';


export default class Provider {

    static successStatusList = [200, 201, 204];

    constructor(dispatch) {
        this.dispatch = dispatch;
        this.headers = {
            'Authorization': localStorage.getItem(TOKEN_KEY),
            'Content-Type': 'application/json'
        }
    }

    checkError(response, json) {
        if (Provider.successStatusList.indexOf(response.status) === -1) {
            const errors = {};
            for (let key in json.errors) {
                if (!json.errors.hasOwnProperty(key)) continue;
                if (json.errors[key].join) {
                    errors[key] = json.errors[key].join('. ');
                } else {
                    errors[key] = json.errors[key];
                }
            }
            return Promise.reject(errors);
        } else {
            return Promise.resolve(json);
        }
    }

}
