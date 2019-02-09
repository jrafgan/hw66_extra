import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lesson63-68168.firebaseio.com/'
});

instance.interceptors.request.use(req => {
    return req;
});

instance.interceptors.request.use(res => {
    return res;
}, error=>{
    console.log(error);
    throw error;
});

export default instance;