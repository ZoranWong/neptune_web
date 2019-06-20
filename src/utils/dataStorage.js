import Storage from 'good-storage'
import Cookies from 'js-cookie'
import Config from '../config/app.js'

/**
 *
 * @param key
 * @returns {*}
 */
export function getUserInfo(key = null){
    let userInfo = Storage.get(Config.storageUserKey);
    if(key)return userInfo.hasOwnProperty(key) ? userInfo[key] : null;
    return userInfo;
}

/**
 *
 * @param user
 * @returns {*}
 */
export function setUserInfo(user){
    Storage.set(Config.storageUserKey,user);
    return user;
}


/**
 *
 * @returns {*}
 */
export function getToken() {
    return Cookies.get(Config.tokenKey)
}

/**
 *
 * @param token
 * @returns {*}
 */
export function setToken(token) {
    return Cookies.set(Config.tokenKey, token ,{ expires: Config.cookiesExpires })
}

/**
 *
 * @returns {*}
 */
export function removeToken() {
    return Cookies.remove(Config.tokenKey)
}

export function isLogin() {
    return getToken() && getUserInfo()
}


/**
 去掉字符串两端空格
 */
export  function trim(str) {
    const reg = /^\s*|\s*$/g;
    return str.replace(reg, "");
}

/**
 给字符串打马赛克
 如：将123456转换为1****6，最多将字符串中间6个字符变成*
 如果字符串长度小于等于2，将不会有效果
 */
export function  addMosaic(str) {
    const s = String(str);
    const lenth = s.length;
    const howmuch = (() => {
        if (s.length <= 2) {
            return s.length;
        }
        const l = s.length - 2;
        if (l <= 6) {
            return l;
        }
        return 6;
    })();
    const start = Math.floor((lenth - howmuch) / 2);
    const ret = s.split("").map((v, i) => {
        if (i >= start && i < start + howmuch) {
            return "*";
        }
        return v;
    });
    return ret.join("");
}

/** 正则 手机号验证 **/
export function  checkPhone(str) {
    const rex = /^1[34578]\d{9}$/;
    return rex.test(str);
}

/** 正则 邮箱验证 **/
export function checkEmail(str) {
    const rex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return rex.test(str);
}

/**
 字符串加密
 简单的加密方法
 */
export function compile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return c;
}

/**
 字符串解谜
 对应上面的字符串加密方法
 */
export function unCompile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}



