export default class Provider {

    static successStatusList = [200, 201, 204];

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    checkError(response, json) {
        if (Provider.successStatusList.indexOf(response.status) === -1) {
            const errors = {};
            for (let key in json.errors) {
                if (!json.errors.hasOwnProperty(key)) continue;
                errors[key] = json.errors[key].join('. ');
            }
            return Promise.reject(errors);
        } else {
            return Promise.resolve(json);
        }
    }

}
