import Storage from 'good-storage'
import Cookies from 'js-cookie'
import Config from '../config/app.js'
import {Base64} from "./beSecret";

/**
 *
 * @param key
 * @returns {*}
 */
export function getUserInfo(){
    let userInfo = Storage.get(Config.storageUserKey);
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
    const rex = /^1[345789]\d{9}$/;
    return rex.test(str);
}
/*正则 身份证号验证*/
export function checkIdCard(str) {
    const rex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return rex.test(str)
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

export function searchJson(data) {
    let params = encodeURIComponent(Base64.encode(JSON.stringify(data)));
    return params
}

/*
* 生成随机整数
*
* */
export function getRandom() {
    return parseInt(Math.random()*10000000000)
}

/*
* 将数组某一项始终置顶在第一位
* */
export function sortAry(ary,key) {
    let index = ary.indexOf(key);
    ary.splice(index,1);
    ary.unshift(key);
    return ary
}

/*
* 数组相乘
* */
//接受可变长数组参数
function addNewType(heads,choices){
    var result=[];
    for(var i=0,len=heads.length;i<len;i++){
        for(var j=0,lenj=choices.length;j<lenj;j++){
            let a = [];
            a.push(heads[i],choices[j]);
            result.push(a);
        }
    }
    return result;
}
export function arrayMultiplication(){
    let heads=arguments[0];
    for(let i=1,len=arguments.length;i<len;i++){
        if(arguments[i].length){
            heads=addNewType(heads,arguments[i]);
        }
    }
    return heads?heads:[];
}

