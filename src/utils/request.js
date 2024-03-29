import Axios from 'axios'
import Config from '../config/app.js'
import { message  } from 'antd';
import {getToken,removeToken} from '../utils/dataStorage.js'
import React from "react";

const service = Axios.create({
    baseURL: Config.apiUrl + '/' + Config.apiPrefix,
    headers: {
        'Accept': '*/*'
    },
    timeout: Config.timeout
});
service.defaults.retry = Config.requestRetry;
service.defaults.retryDelay = Config.requestRetryDelay;

service.interceptors.request.use(
    config => {

        // if(!config.closeLoading){
        //     window.loadingInstance = Loading.service();
        // }
        let token  = getToken();
        if(token)
			config.headers['Authorization'] = token;
        //let noParameters = config.url.indexOf('?')  == -1;
        // //
        //config.url = noParameters ? config.url+'?access_token=' + getToken(): config.url+'&access_token='+ getToken();

        return config
    },
    error => {
        Promise.reject(error)
    }
);



service.interceptors.response.use(
	
    response => {//Grade
    	return response.data;
    },
    error => {
		if (error === undefined || error.code === '502') {
			message.error("服务器请求超时");
			return Promise.reject(error)
		}
		const { response } = error;
		console.log(response, '========');
		if(!response || !response.status) return;
		
		if(response.status === 422 && response.data.errors &&  response.data.errors.introducer_code){
			message.error('请输入正确的介绍人编号');
			return Promise.reject(error);
		}
		message.error(response.data.message);// 弹出后端返回的错误
		setTimeout(()=>{
			if(response.status === 401){
				message.error("登录失效，即将跳转至登录页");
				removeToken();
				window.location.href = './login'
			}
		},2000);
		message.error(response.data.message);
        return Promise.reject(error)//千万不能去掉，，，否则请求超时会进入到then方法，导致逻辑错误。
	}
);

export default service
