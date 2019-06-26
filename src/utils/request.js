import Axios from 'axios'
import Config from '../config/app.js'
import { message  } from 'antd';
import {getToken,removeToken} from '../utils/dataStorage.js'

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

        let noParameters = config.url.indexOf('?')  == -1;
        //config.headers['X-Token'] = getToken() //
        config.url = noParameters ? config.url+'?access_token=' + getToken(): config.url+'&access_token='+ getToken();

        return config
    },
    error => {
        Promise.reject(error)
    }
);



service.interceptors.response.use(
    response => {//Grade

        // if(!response.config.closeLoading){
        //     setTimeout(_=>{
        //         window.loadingInstance.close();
        //     },400);
        // }

        const res = response;
        if (res.status !== 200) {
			message.error('数据返回出错');
            //return Promise.reject('error')
        } else {
            console.log(res,'===');
            return res.data
        }
    },
    error => {
		if (error === undefined || error.code === 'ECONNABORTED') {
			message.error("服务器请求超时");
			return Promise.reject(error)
		}
		const { response: { status, statusText, data: { msg = '服务器发生错误' } }} = error;
		const { response } = error;
		message.error(response.data.message);// 弹出后端返回的错误
        return Promise.reject(error)//千万不能去掉，，，否则请求超时会进入到then方法，导致逻辑错误。
    }
);

export default service
