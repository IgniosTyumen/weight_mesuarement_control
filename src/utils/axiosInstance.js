import * as axios from 'axios';


const getSCRF = async () =>
{
    const response = await axios.get('https://av.admtyumen.ru/get_csrf',{
        withCredentials: true
    })
    return response.data.csrf_token

}
// development beta
export const axiosInstance = axios.create({
    baseURL : 'https://av.admtyumen.ru/api/',
    headers: {
        'x-csrf-token': getSCRF()
    }

});


// development alpha
// export const axiosInstance = axios.create({
//     baseURL : 'http://192.168.88.137:5000/api',
//         headers: {
//         'x-csrf-token': '1575969536.59##c3269b2085cd5830a0dcf1d8bd3878e41facb411'
//     }
// });


// //uncomment for production
// export const axiosInstance = axios.create({
//     baseURL : '/weight_control/',
//     withCredentials: true,
// });

