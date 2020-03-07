import {Z2_EMPHASIS_LIFT} from "echarts/src/util/graphic";

const devApiUrl = 'http://neptune.klsfood.cn';
// const proApiUrl = 'https://www.neptune.kingdomcloud.cn'; //正式环境变量,注意修改
const proApiUrl = 'https://www.neptune.kingdomcloud.cn'; //测试服务器,注意修改

const nodeDevEnv = process.env.NODE_ENV=='development' ? true : false;

export default {
    nodeDevEnv:nodeDevEnv,
    apiUrl : nodeDevEnv ? devApiUrl : proApiUrl,
    apiPrefix : "",
    timeout:5000,
    cookiesExpires:7,
    countDown:60,//短信验证码倒计时
    tokenKey:'ACCESS_TOKEN',
    orderTransformerKey: 'ORDER_TRANSFORMER',
    storageUserKey:'USER_STORAGE',
    requestRetry:4,
    requestRetryDelay:800,
    shortLength:6, // 密码最小长度
}
