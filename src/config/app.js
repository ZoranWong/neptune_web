import {Z2_EMPHASIS_LIFT} from "echarts/src/util/graphic";
const proApiUrl = 'http://neptune.klsfood.cn'; //正式环境变量,注意修改
// const proApiUrl = 'https://www.neptune.kingdomcloud.cn'; //测试服务器,注意修改


export default {
<<<<<<< HEAD
    nodeDevEnv: true,
=======
    nodeDevEnv:true,
>>>>>>> hotfix/order_agent_request_bug
    apiUrl :  proApiUrl,
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
