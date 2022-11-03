// import axios from "axios";
// import router from "@/router";
// import qs from "qs";
// import merge from "lodash/merge";
// import { FeiShuToken } from "@/utils";
// // import { ElMessage  } from 'element-plus';

// import store from "@/store";

// const http = axios.create({
//     timeout: 1000 * 300,
//     withCredentials: true,
//     headers: {
//         // "Access-Control-Allow-Origin": "*",// cors跨域
//         // "Cache-Control": "no-cache",// cors跨域
//         "Content-Type": "application/json; charset=utf-8",
//     },
// });

// /**请求拦截**/
// http.interceptors.request.use(
//     (config) => {
//         // alert(`请求方法-${router.currentRoute.value.path}`)// 123
//         // config.headers['request-startTime'] = new Date().getTime();
//         let token = window.localStorage.getItem("token");
//         config.headers["token"] = token; // 请求头带上token
//         store.commit("showloading");
//         return config;
//     },
//     (error) => {
//         store.commit("closeloading");
//         return Promise.reject(error);
//     }
// );


// /**响应拦截**/
// http.interceptors.response.use(
//     (response) => {
//         // const start = response.config.headers['request-startTime']
//         // const currentTime = new Date().getTime()
//         // const requestDuration = ((currentTime - start)/1000).toFixed(2)
//         // 请求过程花费时长
//         // response.requestDuration = requestDuration

//         store.commit("closeloading");// 请求成功时执行
//         // 401, token失效
//         if(response.data && response.data.code === 401) {
//             if (window.h5sdk && router.currentRoute.value.name != 'login') {
//                 // alert('进入token丢失')// 123
//                 FeiShuToken()
//             } else {
//                 router.push({
//                     name: "login",
//                 });
//             }
//         }
//         return response;
//     },
//     (error) => {
//         // ElMessage ({
//         //     message: error.message,
//         //     type: 'error',
//         //     duration: 5 * 1000
//         // })
//         store.commit("closeloading");// 地址有误///连接不上服务器时执行
//         return Promise.reject(error);
//     }
// );

// /*
//  * 请求地址处理
//  * @param {*} actionName action方法名称
//  */
// http.adornUrl = (actionName) => {
//     // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//     return (
//         (process.env.NODE_ENV !== "production" && process.env.OPEN_PROXY ? "/proxyApi/" : window.SITE_CONFIG.baseUrl) + actionName
//     );
// };

// /*
//  * get请求参数处理
//  * @param {*} params 参数对象
//  * @param {*} openDefultParams 是否开启默认参数?
//  */

// http.adornParams = (params = {}, openDefultParams = true) => {
//     var defaults = {
//         t: new Date().getTime(),
//     };
//     return openDefultParams ? merge(defaults, params) : params;
// };

// /*
//  * post请求数据处理
//  * @param {*} data 数据对象
//  * @param {*} openDefultdata 是否开启默认数据?
//  * @param {*} contentType 数据格式
//  * json: 'application/json; charset=utf-8'
//  * form: 'application/x-www-form-urlencoded; charset=utf-8'
//  */
// http.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
//     var defaults = {
//         t: new Date().getTime(),
//     };
//     data = openDefultdata ? merge(defaults, data) : data;
//     return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
// };

// export default http;
