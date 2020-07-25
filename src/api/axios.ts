import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, Method } from 'axios';
const http: AxiosInstance = axios.create();
// 每个请求都加上这个请求url
http.defaults.withCredentials = true;
http.defaults.baseURL = process.env.BASE_URL;
// 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
    const token: string | null = localStorage.getItem(process.env.REACT_APP_BEARER_TOKEN!);
    // 获取本地存储，并放到Authorization 并且请求不是登录请求
    if (token && !(/(\/login)|(\/register)/.test(config.url as string))) {
        config.headers.Authorization = token;
    }
    return config;
}, (error: Error) => {
    return Promise.reject(error);
});
// 响应拦截
http.interceptors.response.use((res: AxiosResponse) => {
    if (res.status === 401) {
        return Promise.reject(new Error('验证过期！！！'));
    }
    return res.data;
}, (error: Error) => {
    return Promise.reject(error);
});
/**
 * axios请求封装
 * @param {string} url 这是请求url
 * @param {object} data 这是请求的数据，当get请求的话，会变成请求参数?a=1&....，不传的话就是空对象
 * @param {string} type 这是请求类型，默认Get
 */
export function axiosHttp<Data = any, ResType = any>(url: string, data?: Data, type: Method = 'GET') {
    const isGet: boolean = type === 'GET' || type === 'get';
    if (isGet) {
        if (!data) data = {} as any;
        let query = '?';
        if (data && typeof data === 'object') {
            Object.keys(data).forEach((key: string) => {
                query += `${key}=${(data as any)[key]}&`;
            });
        }
        if (query.length > 1) {
            url = url + query.slice(0, -1);
        }
    }
    // console.log(type,url);
    return new Promise<ResType>((resolve, reject) => {
        http({
            method: type as any,
            url,
            data: (isGet ? {} : data),
        }).then((res: AxiosResponse) => {
            resolve(res as any);
        }).catch((error: Error) => {
            reject(error);
        });
    });
}