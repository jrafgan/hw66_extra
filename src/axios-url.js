import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lesson63-68168.firebaseio.com/'
});

instance.interceptors.request.use(req => {
    console.log('[In request interceptor]', req);
    return req;
});

instance.interceptors.request.use(res => {
    console.log('[In request interceptor]', res);
    return res;
}, error=>{
    console.log('[In response error interceptor]', error);
    throw error;
});

export default instance;