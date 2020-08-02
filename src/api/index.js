import axios from 'axios';

class Api {
    constructor() {
        this.instance = axios.create({
            timeout: 10000,
        });

        this.instance.interceptors.response.use(
            response => response,
            error => {
                return Promise.reject(error);
            }
        );
    }

    send(url, data, method = 'post') {
        let cancelToken = axios.CancelToken;
        let source = cancelToken.source();

        return this.instance({
            method,
            url,
            data,
            cancelToken: source.token
        }).then(response => {
            return response.data;
        });
    }

    get(url, data = {}) {
        return this.send(url, data, 'get');
    }

    post(url, data = {}) {
        return this.send(url, data, 'post');
    }
}

export default new Api();
