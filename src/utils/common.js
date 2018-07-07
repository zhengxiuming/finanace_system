/**
 * Created by zhengxiuming on 2017/11/18.
 */
export const objToForm = (v) => {
  var str = '';
  for (let o in v) {
    str += o + '=' + v[o] + '&';
  }
  str = str.substring(0, str.length - 1);
  return str;
};

export const deepToFrom = (params) => {
  let str = '';
  for (let key in params) {
    let value = params[key];
    if (typeof(value) == "object") {
      value = JSON.stringify(value);
    }
    str += key + '=' + value + '&';
  }
  str = str.substring(0, str.length - 1);
  return str;
};

//获取当前是否为微信
export const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};


/**
 * 阻止重复提交
 * @param timer 两次有效点击的时间间隔
 * @param msg  时间间隔内点击按钮的提示信息
 */

export const stopRepeat = () => {
  let flag = true;
  return function (timer, msg, Toast, cb) {
    if (flag) {
      flag = false;
      !!cb && cb();
      setTimeout(function () {
        flag = true
      }, timer)
    } else {
      if (msg) {
        Toast.info(msg, 2)
      }
    }
  }

};
//删除数组的空位
export const removeEmptyArrayEle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length == 0) {
      arr.splice(i, 1);
      i = i - 1;
    }
  }
  return arr;
};
