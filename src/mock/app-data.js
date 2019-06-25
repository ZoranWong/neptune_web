const Mock = require("mockjs");
//
// Mock.setup({
//     timeout: '0-500',
// });

/**
 * 模拟数据
 * **/
// ID序列
let id_sequence = 1000;


// 所有的用户数据
const users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    phone: "13600000000",
    email: "admin@react.com",
    desc: "超级管理员",
    conditions: 1,
    roles: [1, 2, 3]
  },
  {
    id: 2,
    username: "user",
    password: "123456",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员",
    conditions: 1,
    roles: [2]
  }
];

/**
 * 方法
 * **/
// 登录
const onLogin = params => {
  const u = users.find(item => {
    return item.username === params.username;
  });
  if (!u) {
    return { status: 204, data: null, message: "该用户不存在" };
  } else if (u.password !== params.password) {
    return { status: 204, data: null, message: "密码错误" };
  }
  return { status: 200, data: u, message: "登录成功" };
};



exports.mockApi = (url, params) => {
  console.log("调用API：", url, params);
  switch (url) {
    case "/api/login":
      return onLogin(params);
    
    default:
      return { status: 404, data: null, message: "api not found" };
  }
};
