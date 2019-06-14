(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.index = {})));
}(this, (function (exports) { 'use strict';

function author(options) {
  const value = options || {};
  const name = value.name || 'YHTML5';
  const url = value.url || 'https://github.com/yhtml5';
  console.clear();
  console.log(
    `%c ${name} %c Copyright \xa9 2015-%s`,
    'font-family: "microsoft yahei", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;",
    (new Date).getFullYear());
  console.log(
    "%c We work hard to contribute our work back to the web, mobile, big data, && new Front - End technology.",
    "color:#333;font-size:16px;margin:4px;");
  console.log(
    "%c 温馨提示：请不要调皮地在此粘贴执行任何内容，这可能会导致您的账户受到攻击，给您带来损失 ！^_^",
    "color:#333;font-size:16px;margin:4px;"
  );
  console.log(
    `%c${url}`,
    "color:#333;font-size:16px;margin:4px;");
}

window.yhtml5 = author;

function debug( name ){
  let key =  '%c' + name;
  let c = hold[name] || null;
  if ( !c ) {
      let i = count % colors.length;
      c = 'color:' + colors[i];
      count++;
      hold[name] = c;
  }

  let show = true;
  if( filter ) {
      if ( regs === undefined) {
          check_filter();
      }
      show = check_show( name );
  }

  function logger( first , ...arg ){

      if ( enable && show ) {

          var t = new Date();
          var d = t.getTime() - time.getTime();
          var e = 'ms';
          if ( d > 1000 ) {
              d = Math.round( d / 1000 );
              e = 's';
          }
          var m = d + e;
          time = t;
          return log( key,  c , first ,  ...arg , m );
      }
  }
  return logger;
}

const downLoad = ({
  name = 'download',
  url = ''
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (Object.prototype.toString.call(url) !== '[object String]' && !url) {
      console.error('The function downLoad url should be a not empty string');
      return
    }
  }
  let a = document.createElement('a');
  a.href = encodeURI(url);
  a.download = name;
  a.id = name;
  a.style.display = 'none';
  // a.click()
  document.body.appendChild(a);
  document.getElementById(name).click();
  document.body.removeChild(document.getElementById(name));
  a = null;
};

/**
 * formatNumber
 * params description：
 * @param {number} number                 要格式化的数字
 * @param {function} beforeTransform      转换前处理, 例: 分=>元
 * @param {number} decimals               保留几位小数, 默认 0
 * @param {number} util                   多少位开启换单位, 默认 万
 * @param {string} roundtag               舍入参数, [ceil: 向上取整, floor: 向下取整, round: 四舍五入], 默认 round
 * @param {string} decPoint               小数点符号, 默认 '.'
 * @param {string} thousandsSep           千分位符号, 默认 无
 */

function formatNumber(values) {
  const { decimals = 0, util, decPoint = '.', thousandsSep, roundtag = 'round', beforeTransform } = values || {};
  if (process.env.NODE_ENV !== 'production') {
    if (Object.prototype.toString.call(decimals) !== '[object Number]') {
      throw `formatNumber\'s parameter decimals must be a Number, but get ${decimals}`
      return
    }
    if (!(roundtag === 'ceil' || roundtag === 'floor' || roundtag === 'round')) {
      throw `formatNumber\'s parameter roundtag can only be one of the [ceil,floor,round] or be Omitted, but get ${roundtag}`
      return
    }
    if (Object.prototype.toString.call(beforeTransform) === '[object Function]') {
      try {
        beforeTransform(100);
      } catch (error) {
        throw `the function beforeTransform has error \n ${error}`
      }
    } else if (beforeTransform) {
      throw `formatNumber\'s parameter beforeTransform must be a function, but get ${beforeTransform}`
    }
  }

  return (number) => {
    if (beforeTransform) {
      number = beforeTransform(number);
    }
    // let number = JSON.parse(JSON.stringify(value))
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      s = '',
      toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec);
        console.log();
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (thousandsSep) {
      const re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + thousandsSep + "$2");
      }
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(decPoint);
  }
}

let awaitStatus = true;
const timer = (time) => new Promise((resolve) => setTimeout(resolve, time));

const notRepeat = (time = 1000) =>
  new Promise((resolve, reject) => {
    if (awaitStatus) {
      awaitStatus = false;
      resolve();
      timer(time)
        .then(() => { awaitStatus = true; });
    } else {
      reject('Do not repeat!');
    }
  });

var version = "0.5.0";

function setCookie(name, value, hour) {
  let currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + (hour * 60 * 60 * 1000));
  document.cookie = 'token=null';
  document.cookie = `${name}=${value};expires=${currentTime.toGMTString()}`;
}

const getCookie = (name) => {
  return (new RegExp(name, 'g').test(document.cookie))
    ? document.cookie.split(name)[1].split("=")[1].split(";")[0]
    : false
};
const clearCookie = (name) => {
  if (name) {
    setCookie(name, '', -1);
  } else {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      keys.forEach((key) => setCookie(key, '', -1));
    }
  }
};

/**
 * - create script success and callback
 * - promise async/await
 * - ie
 * - jquery: https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L8569
 *
 */

function createScript(src, callback) {
  if (!src) return;
  var _callback = callback || function () { };
  var script = document.createElement('script');
  script.setAttribute('src', src);
  // script.setAttribute('charset', sBianMa);
  // script.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(script);
  // ie browser
  if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
    script.onreadystatechange = function () {
      if (this.readyState == 'loaded' || this.readyState == 'complete') {
        script.parentNode.removeChild(script);
        // if (callback) callback();
        console.log('ie');
        _callback();
      }
    };
  } else if (/gecko/.test(window.navigator.userAgent.toLowerCase()) ||
    /opera/.test(window.navigator.userAgent.toLowerCase())) {
    script.onload = function () {
      script.parentNode.removeChild(script);
      console.log('firefox');
      _callback();
    };
  } else {
    script.parentNode.removeChild(script);
    console.log('other');
    _callback();
  }
}

function createScriptAsync(url) {
  return new Promise(function (resolve, reject) {
    createScript(url, resolve);
  })
}

// 存在url 有俩个相同的key 会取第一个
function queryUrlParam(key, url) {
  var value = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
  return value ? value[1] : ""
}

function parseUrlToObject(url) {
  if (!url) { return '' }
  const reg = /([^#?&]*)=([^&#]*)/g;
  const args = url;
  const query = {};
  let re = reg.exec(args);
  while (re) {
    query[re[1]] = re[2];
    re = reg.exec(args);
  }
  return query;
}

function parseObjectToUrl(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') { return '' }
  return Object.entries(obj).map(([key, val]) => {
    const type = Object.prototype.toString.call(val);
    return (type === '[object String]' || type === '[object Number]' || type === '[object Boolean]')
      ? `${key}=${val}` : ''
  }).join('&')
}

/**
*  reference: https://github.com/lodash/lodash
*  types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
*/

const isUndefined = value => typeof value === 'undefined';
const isNull = value => Object.prototype.toString.call(value) === '[object Null]';
const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';
const isString = value => Object.prototype.toString.call(value) === '[object String]';
const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';
const isArray = value => Object.prototype.toString.call(value) === '[object Array]';
const isArrayEmpty = value => isArray(value) && value.length === 0;
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';
const isObjectEmpty = value => isObject(value) && Object.keys(value).length === 0;

/**
 * TODO: 自动生成 index.js
 */

exports.author = author;
exports.console = debug;
exports.download = downLoad;
exports.formatNumber = formatNumber;
exports.notRepeat = notRepeat;
exports.version = version;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.clearCookie = clearCookie;
exports.createScript = createScript;
exports.createScriptAsync = createScriptAsync;
exports.queryUrlParam = queryUrlParam;
exports.parseUrlToObject = parseUrlToObject;
exports.parseObjectToUrl = parseObjectToUrl;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isArrayEmpty = isArrayEmpty;
exports.isObject = isObject;
exports.isObjectEmpty = isObjectEmpty;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map