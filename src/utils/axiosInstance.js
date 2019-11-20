import * as axios from 'axios';

// development beta
export const axiosInstance = axios.create({
    baseURL : 'https://av.admtyumen.ru/api/',
    headers: {
        'x-csrf-token': '1574167662.54##03b21a8a9c75e154ca69e8de559c51540f198386'
    }
});

//development alpha
// export const axiosInstance = axios.create({
//     baseURL : 'http://192.168.88.137:5000/api',
// });


//uncomment for production
// export const axiosInstance = axios.create({
//     baseURL : '/weight_control/',
// });
