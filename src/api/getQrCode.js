import Api from './index'

export const getQrCode = (payload) => {
    const url = 'https://api.qrserver.com/v1/create-qr-code/';
    return Api.get(`${url}?data=${payload}`);
}
