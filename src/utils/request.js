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
        config.headers['Authorization'] = getToken();
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
		
		if (error === undefined || error.code === 'ECONNABORTED') {
			message.error("服务器请求超时");
			return Promise.reject(error)
		}
		const { response: { status, statusText, data: { msg = '服务器发生错误' } }} = error;
		const { response } = error;
        message.error(response.data.message);// 弹出后端返回的错误
		setTimeout(()=>{
			if(response.status === 401 || response.status === 500){
				removeToken();
				window.location.href = './login'
			}
		},2000);

        return Promise.reject(error)//千万不能去掉，，，否则请求超时会进入到then方法，导致逻辑错误。
	}
);

export default service
