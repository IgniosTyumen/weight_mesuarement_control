import * as axios from 'axios';

// development beta
export const axiosInstance = axios.create({
    baseURL : 'https://av.admtyumen.ru/api/',
    withCredentials: true,
    headers: {
        'x-csrf-token': '1576139398.15##06d702c07d856ab7b54f977db1afe02f13446d80'
    }
});


// development alpha
// export const axiosInstance = axios.create({
//     baseURL : 'http://192.168.88.137:5000/api',
//         headers: {
//         'x-csrf-token': '1575969536.59##c3269b2085cd5830a0dcf1d8bd3878e41facb411'
//     }
// });


//uncomment for production
// export const axiosInstance = axios.create({
//     baseURL : '/weight_control/',
// });

