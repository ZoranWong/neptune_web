import   Config  from "../config/app";
import reqwest from "reqwest"; // 封装了ajax请求的库
import axios from "axios"; // 封装了fetch请求的库

export default class ApiService {
  // ajax请求
  static newPost(url,methods, bodyObj = {}) {
    return reqwest({
      url: `${Config.apiUrl}/${url}`, // URL
      method:methods, // 请求方式
      contentType: "application/json;charset=utf-8", // 消息主体数据类型 JSON
      crossOrigin: true, // 开启CORS跨域
      withCredentials: true, // 请求头中是否带cookie，有利于后端开发保持他们需要的session
      data: JSON.stringify(bodyObj), // 参数，弄成json字符串
      mode: 'cors',
      type: "json" // 参数类型JSON
    });
  }

  // fetch请求
  static newFetch(url,methods, bodyObj = {}) {
    return axios({
      url: `${Config.apiUrl}/${url}`,
      method: methods,
      mode: 'cors',
      headers: {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
      },
      withCredentials: true,
      data: JSON.stringify(bodyObj)
    });
  }
}
