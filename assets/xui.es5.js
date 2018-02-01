'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
 created by xumeng
 http://xumengzi.top/
*/

/*
include most functions and styles etc.
*/
;(function (w) {
    function Xui() {
        this.version = '1.4.4';
        console.log("xui v" + this.version);
    };

    Xui.prototype = {
        constructor: Xui,
        addZero: function addZero(e) {
            if (e < 0) {
                return e = e > -10 ? '-0' + -e : e;
            } else {
                return e = e < 10 ? '0' + e : e;
            };
        },
        checkLegal: function checkLegal(type, str) {
            var reg = void 0;
            switch (type) {
                case "name":
                    reg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
                    break;
                case "mobile":
                    reg = /^1[34578]\d{9}$/;
                    break;
                case "email":
                    reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                    break;
            };
            return reg.test(str);
        },
        codeStr: function codeStr(str) {
            return encodeURIComponent(str);
        },
        countDown: function countDown() {
            var _this = this;

            var downTime = null;
            var args = arguments[0];
            if (!(args.endDate && args.target)) {
                throw new Error('结束日期和目标元素必传');
            };
            args.endDate = args.endDate.replace(/\//g, '-');
            clearInterval(downTime);
            downTime = setInterval(function () {
                var start = _this.now(),
                    end = _this.now(args.endDate);
                var diff = (end - start) / 1000;
                var day = parseInt(diff / 24 / 3600, 10),
                    hour = parseInt(diff % (24 * 3600) / 3600, 10) - 8,
                    minute = parseInt(diff % 3600 / 60, 10),
                    second = parseInt(diff % 60, 10);
                day = _this.addZero(day);
                hour = _this.addZero(hour);
                minute = _this.addZero(minute);
                second = _this.addZero(second);
                if (args.isStop && diff <= 0) {
                    clearInterval(downTime);
                    day = hour = minute = second = '00';
                };
                function addNode(tar, nodeName) {
                    return '<' + nodeName + '>' + tar + '</' + nodeName + '>';
                };
                if (args.nodeName) {
                    day = addNode(day, args.nodeName);
                    hour = addNode(hour, args.nodeName);
                    minute = addNode(minute, args.nodeName);
                    second = addNode(second, args.nodeName);
                };
                document.querySelectorAll('.' + args.target).forEach(function (item, index) {
                    item.innerHTML = day + '天' + hour + '时' + minute + '分' + second + '秒';
                });
            }, 1000);
        },
        decodeStr: function decodeStr(str) {
            return decodeURIComponent(str);
        },
        deleteEle: function deleteEle(ele) {
            var tar = document.querySelectorAll(ele);
            if (tar.length) {
                var list = [].concat(_toConsumableArray(tar));
                for (var i in list) {
                    list[i].remove();
                };
            };
        },
        dropDown: function dropDown() {
            var that = this;
            var drop = {
                renderHTML: function renderHTML(args) {
                    var tar = document.getElementById(args.id),
                        opt = tar.getElementsByTagName('option');
                    tar.classList.add('none');
                    var uls = document.createElement('ul');
                    // add input
                    if (args.isSearch) {
                        var inp = document.createElement('input');
                        inp.setAttribute('type', 'text');
                        args.placeHolder = args.placeHolder || 'type to search';
                        inp.setAttribute('placeHolder', args.placeHolder);
                        inp.setAttribute('value', '');
                        inp.classList.add('xui_input');
                        inp.classList.add('xui_input_search');
                        uls.appendChild(inp);
                    };
                    // add li
                    for (var i = 0; i < opt.length; i++) {
                        var name = opt[i].innerHTML,
                            val = opt[i].value;
                        var lis = document.createElement('li');
                        lis.innerHTML = name;
                        lis.setAttribute('value', val);
                        lis.classList.add('xui_drop_li');
                        uls.appendChild(lis);
                    };
                    uls.classList.add('xui_drop_list');
                    uls.classList.add('none');
                    var con = document.createElement('div');
                    con.classList.add('xui_drop_down');
                    // add button
                    var but = document.createElement('button');
                    but.innerHTML = opt[0].innerHTML;
                    but.value = opt[0].value;
                    but.classList.add('xui_btn');
                    but.classList.add('xui_drop_btn');
                    con.appendChild(but);
                    con.appendChild(uls);
                    tar.after(con);
                },
                event: function event(args) {
                    var tar = document.getElementById(args.id),
                        ele = tar.nextElementSibling,
                        search = ele.querySelector('.xui_input_search');
                    ele.addEventListener('click', this.choose, false);
                    document.body.onclick = function (e) {
                        var tar = e.target.classList;
                        if (!(tar.contains('xui_drop_li') || tar.contains('xui_drop_btn') || tar.contains('xui_input_search'))) {
                            var newArr = [].concat(_toConsumableArray(document.querySelectorAll('.xui_drop_list')));
                            for (var i in newArr) {
                                newArr[i].classList.add('none');
                                for (var j = 0; j < newArr[i].childNodes.length; j++) {
                                    newArr[i].childNodes[j].classList.contains('none') && newArr[i].childNodes[j].classList.remove('none');
                                };
                            };
                        }
                    };
                    search && search.addEventListener('keyup', this.search, false);
                },
                search: function search(e) {
                    if (e.target.classList.contains('xui_input_search')) {
                        var val = e.target.value.trim();
                        var list = e.target.parentNode.querySelectorAll('li');
                        list = that.toArray(list);
                        for (var i in list) {
                            if (val != '' && list[i].innerHTML.indexOf(val) == -1) {
                                list[i].classList.add('none');
                            } else {
                                list[i].classList.remove('none');
                            };
                        };
                    }
                },
                choose: function choose(e) {
                    var tar = e.target.classList;
                    if (tar.contains('xui_drop_btn')) {
                        // e.target.nextSibling.classList.remove('none');
                        e.target.nextSibling.classList.toggle('none');
                        // if ((e.target.nextSibling.classList.contains('none'))) {
                        //  console.log('3');
                        //  e.target.nextSibling.classList.remove('none');
                        // } else{
                        //  e.target.nextSibling.classList.add('none');
                        // };
                    } else if (e.target.parentNode.classList.contains('xui_drop_list')) {
                        if (e.target.nodeName == 'INPUT') {
                            return;
                        };
                        document.getElementById(args.id).value = e.target.getAttribute('value');
                        e.target.parentNode.previousSibling.value = e.target.getAttribute('value');
                        e.target.parentNode.previousSibling.innerHTML = e.target.innerHTML;
                        e.target.parentNode.classList.add('none');
                    } else {
                        if (!document.querySelectorAll('.xui_drop_list').length) {
                            return;
                        };
                        var newArr = that.toArray(document.querySelectorAll('.xui_drop_list'));
                        for (var i in newArr) {
                            newArr[i].classList.add('none');
                            for (var j = 0; j < newArr[i].childNodes.length; j++) {
                                newArr[i].childNodes[j].classList.contains('none') && newArr[i].childNodes[j].classList.remove('none');
                            };
                        };
                        var inpArr = that.toArray(document.querySelectorAll('.xui_input_search'));
                        for (var _i in newArr) {
                            inpArr[_i] && (inpArr[_i].value = '');
                        };
                    };
                },
                init: function init(args) {
                    this.renderHTML(args);
                    this.event(args);
                }
            };
            var args = arguments[0];
            drop.init(args);
        },
        formatDate: function formatDate(date, bool) {
            date = typeof date !== 'number' ? date.replace(/[^\d]/g, '') - 0 : date;
            date = new Date(date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = this.addZero(month);
            var day = date.getDate();
            day = this.addZero(day);
            if (bool) {
                var hour = date.getHours();
                hour = this.addZero(hour);
                var min = date.getMinutes();
                min = this.addZero(min);
                var sec = date.getSeconds();
                sec = this.addZero(sec);
                return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            };
            return year + '-' + month + '-' + day;
        },
        getCookie: function getCookie(name) {
            var myCookie = document.cookie;
            var reg = new RegExp("([\\s]?)" + name + "=([\\d\\w]+)");
            //2017/12/06 修改为正则匹配
            //是的,普通循环显得太low
            return myCookie.match(reg) === null ? '' : decodeURIComponent(myCookie.match(reg)[2]);
            // myCookie = myCookie.split('; ');
            // for(let i = 0;i < myCookie.length; i++){
            //  let sinCookie = myCookie[i].split('=');
            //  if (sinCookie[0] == name) {
            //      return sinCookie[1];
            //  };
            // };
            // return '';
        },
        loading: function loading(isShow, ele, string) {
            //delete already exists
            this.deleteEle('.xu_loading');
            if (!isShow) {
                return;
            };
            var tar = document.createElement('div');
            type = undefined;
            if (type == 1) {
                tar.innerHTML = '\n\t    \t\t\t<div>\n\t\t\t    \t\t<div class="dot circle1"></div>\n\t\t\t\t\t\t<div class="dot circle2"></div>\n\t\t\t\t\t\t<div class="dot circle3"></div>\n\t\t\t\t\t\t<div class="dot circle4"></div>\n\t\t\t\t\t\t<div class="dot circle5"></div>\n\t\t\t\t\t\t<div class="dot circle6"></div>\n\t\t\t\t\t\t<div class="dot circle7"></div>\n\t\t\t\t\t\t<div class="dot circle8"></div>\n\t\t\t\t\t\t<div class="dot circle9"></div>\n\t\t\t\t\t\t<div class="dot circle10"></div>\n\t\t\t\t\t\t<div class="dot circle11"></div>\n\t\t\t\t\t\t<div class="dot circle12"></div>\n\t\t\t\t\t</div>\n\t\t    \t';
            } else if (type == 2) {
                tar.innerHTML = '\n\t    \t\t\t<div>\n\t\t\t    \t\t<div class="dott dot1"></div>\n\t\t\t\t\t\t<div class="dott dot2"></div>\n\t\t\t\t\t\t<div class="dott dot3"></div>\n\t\t\t\t\t</div>\n\t\t    \t';
            } else {
                tar.innerHTML = '\n\t    \t\t\t<div>\n\t\t\t    \t\t<div class="fence fence1"></div>\n\t\t\t    \t\t<div class="fence fence2"></div>\n\t\t\t    \t\t<div class="fence fence3"></div>\n\t\t\t    \t\t<div class="fence fence4"></div>\n\t\t\t    \t\t<div class="fence fence5"></div>\n\t\t\t    \t\t<div class="fence fence6"></div>\n\t\t    \t\t</div>\n\t\t    \t\t' + (string ? '<div>' + string + '</div>' : '') + '\n\t\t    \t';
            }
            tar.classList.add('xu_loading');
            if (typeof ele == 'string') {
                tar.classList.add('xu_part_loading');
                document.querySelector(ele).appendChild(tar);
            } else {
                document.body.appendChild(tar);
            };
        },
        hasClass: function hasClass(source, target) {
            return source.indexOf(target) > -1 ? true : false;
        },
        isArray: function isArray(arr) {
            if (Array.isArray) {
                return Array.isArray(arr);
            } else {
                return Object.prototype.toString.call(arr) === '[object Array]';
            };
        },
        isFunction: function isFunction(fn) {
            return typeof fn === 'function';
        },
        isMobile: function isMobile() {
            return (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
            );
        },
        message: function message() {
            var _arguments = arguments,
                _this2 = this;

            //delete already exists
            this.deleteEle('xu_message');
            var tar = document.createElement('div');
            tar.innerHTML = '\n\t    \t\t<span>' + arguments[0] + '</span>\n\t    \t';
            tar.classList.add('xu_message');
            document.body.appendChild(tar);
            setTimeout(function () {
                _arguments[2] && _arguments[2]();
                _this2.deleteEle('.xu_message');
            }, arguments[1] || 1000);
        },
        now: function now(date, days, bool) {
            if (typeof days == 'number') {
                return this.formatDate(new Date(date).setDate(new Date(date).getDate() + days), bool);
            } else {
                date = date || new Date();
                return +new Date(date);
            };
        },
        queryString: function queryString(str) {
            var url = location.href;
            var reg = new RegExp("([?&])" + str + "=([^&]*)([?&]?)");
            return url.match(reg) === null ? '' : decodeURIComponent(url.match(reg)[2]);
        },
        randomNum: function randomNum(min, max) {
            if (typeof min == 'number' && typeof max == 'number' && max > min) {
                return Math.round(Math.random() * (max - min) + min);
            } else {
                throw new Error('must be two numbers or in right order');
            };
        },
        recordData: function recordData() {
            if (!arguments[0]) {
                throw new Error('parameters are required!');
            }
            var data = arguments[0].data,
                url = arguments[0].url;
            var isQuestionMark = url.indexOf('?') > -1 ? '&' : '?';
            var params = '';
            for (var i in data) {
                var each = data[i];
                params += '&' + i + '=' + (each ? each : '');
            };
            params = isQuestionMark + params.substr(1, params.length);
            new Image(1, 1).src = url + params;
        },
        removeCookie: function removeCookie(name) {
            var val = this.getCookie(name);
            this.setCookie(name, val, -1);
        },
        removeMul: function removeMul(arr) {
            if (arr instanceof Array) {
                var newArr = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        !newArr.includes(i) && newArr.push(i);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                ;
                return newArr;
            } else {
                return false;
            };
        },
        setCookie: function setCookie(name, value, days, path) {
            if (!name) {
                throw new Error('cookie名必传');
            };
            if (!value) {
                throw new Error('cookie值必传');
            };
            var now = new Date();
            var date = now.setDate(days);
            var newDate = new Date(date);
            switch (arguments.length) {
                case 3:
                    document.cookie = name + '=' + value + '; expires=' + newDate;
                    break;
                case 4:
                    document.cookie = name + '=' + value + '; expires=' + newDate + '; path=/' + path;
                    break;
                default:
                    document.cookie = name + '=' + value;
                    break;
            };
        },
        shallowCopy: function shallowCopy(obj) {
            var newObj = {};
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    newObj[i] = obj[i];
                };
            };
            return newObj;
        },
        showImg: function showImg() {
            var that = this;
            //delete already exists
            that.deleteEle('xu_img');
            var tar = document.createElement('div');
            tar.innerHTML = '\n\t    \t\t<span class="xui_close"></span>\n\t    \t\t<div class="xui_img_con">\n\t    \t\t\t<img class="xui_img" src=' + arguments[0] + ' alt="">\n\t    \t\t\t<div class="xui_icon">\n\t    \t\t\t\t<span class="xui_left" xui-type="1"></span>\n\t    \t\t\t\t<span class="xui_zoomin" xui-type="2"></span>\n\t    \t\t\t\t<span class="xui_zoomout" xui-type="3"></span>\n\t    \t\t\t\t<span class="xui_right" xui-type="4"></span>\n\t    \t\t\t\t' + (arguments[1] ? '<a class="xui_download" href=' + arguments[0] + ' download=' + arguments[1] + '></a>' : '') + '\n\t    \t\t\t</div>\n\t    \t\t</div>\n\t    \t';
            tar.classList.add('xui_img_content');
            document.body.appendChild(tar);
            function showImgPic(e) {
                if (e.target.className == 'xui_close') {
                    that.deleteEle('.xui_img_content');
                    document.body.removeEventListener('click', showImgPic, false);
                };
                if (e.target.getAttribute('xui-type')) {
                    var _tar = document.querySelector('.xui_img');
                    //get current img rotate degrees
                    var rotate = _tar.style.transform && _tar.style.transform.match(/-?\d/igm).join('') - 0;
                    var width = _tar.style.width && _tar.style.width.match(/\d/igm).join('') - 0;
                    switch (e.target.getAttribute('xui-type') - 0) {
                        case 1:
                            var leftDeg = rotate + 90;
                            _tar.style.transform = 'rotate(' + leftDeg + 'deg)';
                            _tar.style.webkitTransform = 'rotate(' + leftDeg + 'deg)';
                            _tar.style.mozTransform = 'rotate(' + leftDeg + 'deg)';
                            _tar.style.MsTransform = 'rotate(' + leftDeg + 'deg)';
                            break;
                        case 2:
                            width = (width > 140 ? 140 : width) || 100;
                            _tar.style.width = width + 10 + '%';
                            _tar.style.marginLeft = -(width + 10 - 100) / 2 + '%';
                            break;
                        case 3:
                            width = width ? width < 60 ? 60 : width : 100;
                            _tar.style.width = width - 10 + '%';
                            _tar.style.marginLeft = -(width - 10 - 100) / 2 + '%';
                            break;
                        case 4:
                            var rightDeg = rotate - 90;
                            _tar.style.transform = 'rotate(' + rightDeg + 'deg)';
                            _tar.style.webkitTransform = 'rotate(' + rightDeg + 'deg)';
                            _tar.style.mozTransform = 'rotate(' + rightDeg + 'deg)';
                            _tar.style.MsTransform = 'rotate(' + rightDeg + 'deg)';
                            break;
                        default:
                            break;
                    };
                };
            };
            document.body.addEventListener('click', showImgPic, false);
        },
        snowFlake: function snowFlake() {
            var args = arguments[0],
                tar = document.getElementById(args.id);
            args.direction == 'left' && tar.classList.add('xui_snow_left');
            tar.classList.add('xui_snow');
        },
        subLastStr: function subLastStr(str) {
            return str.substr(0, str.length - 1);
        },
        tab: function tab() {
            var args = arguments[0];
            var tar = document.getElementById(args.id);
            var tab = tar.getElementsByTagName('li');
            var list = tar.querySelectorAll('.xui_tab_body div');
            list = [].concat(_toConsumableArray(list));
            args.animateType = args.animateType || 'none';
            args.activeIndex = args.activeIndex >= tab.length ? 0 : args.activeIndex ? args.activeIndex : 0;
            if (tab.length !== list.length) {
                throw new Error("tab's number error");
            };
            if (typeof args.activeIndex == 'number') {
                for (var l in list) {
                    if (args.animateType == 'toLeft') {
                        list[l].style.transform = l == args.activeIndex ? 'translate(0%)' : 'translate(-100%)';
                    } else if (args.animateType == 'toRight') {
                        list[l].style.transform = l == args.activeIndex ? 'translate(0%)' : 'translate(100%)';
                    } else {
                        list[l].style.display = l == args.activeIndex ? 'block' : 'none';
                    };
                };
            };

            var _loop = function _loop(i) {
                i == args.activeIndex && tab[i].classList.add('selected');
                tab[i].onclick = function (e) {
                    if (e.currentTarget.className == 'selected') {
                        return;
                    };
                    for (var j in list) {
                        if (i == j) {
                            if (args.animateType != 'none') {
                                list[j].style.transform = 'translate(0%)';
                            } else {
                                list[j].style.display = 'block';
                            };
                            tab[j].classList.add('selected');
                            args.fn && args.fn();
                        } else {
                            if (args.animateType == 'toLeft') {
                                list[j].style.transform = 'translate(-100%)';
                            } else if (args.animateType == 'toRight') {
                                list[j].style.transform = 'translate(100%)';
                            } else {
                                list[j].style.display = 'none';
                            };
                            tab[j].classList.remove('selected');
                        };
                    };
                };
            };

            for (var i = 0; i < tab.length; i++) {
                _loop(i);
            };
        },
        toArray: function toArray(arrLike) {
            return Array.prototype.slice.call(arrLike);
        },
        prompt: function prompt() {
            var _this3 = this;

            //delete already exists
            this.deleteEle('.xu_prompt');
            var defaults = {
                tips: '温馨提示',
                text: 'hello,world',
                isShowClose: true,
                fn: null,
                confirmBtn: null,
                cancelBtn: null
            };
            var opts = Object.assign({}, defaults, arguments[0]);
            var tar = document.createElement('div');
            tar.innerHTML = '\n\t    \t\t<div class="xu_content">\n\t    \t\t\t' + (opts.isShowClose ? '<span class="xu_close"></span>' : '') + '\n\t\t\t    \t<div class="xu_text">\n\t\t\t    \t\t<div class="xui_title"><span>' + opts.tips + '</span></div>\n\t\t\t    \t\t<div class="tips">' + opts.text + '</div>\n\t\t\t    \t</div>\n\t\t\t    \t<div class="xu_btn">\n\t\t\t\t    \t' + (opts.cancelBtn ? '<button class="xui_btn xui_btn_cancel xui_cancel">' + opts.cancelBtn.text + '</button>' : '') + '\n\t\t\t\t    \t' + (opts.confirmBtn ? '<button class="xui_btn xui_btn_default xui_confirm">' + opts.confirmBtn.text + '</button>' : '') + '\n\t\t\t    \t</div>\n\t\t\t    </div>\n\t    \t';
            tar.classList.add('xu_prompt');
            document.body.appendChild(tar);
            //按钮回调
            document.querySelector('.xu_content').addEventListener('click', function (e) {
                var tar = e.target.classList;
                if (tar.contains('xu_close') || tar.contains('xui_cancel')) {
                    _this3.deleteEle('.xu_prompt');
                    opts.cancelBtn && opts.cancelBtn.fn && opts.cancelBtn.fn();
                };
                if (tar.contains('xui_confirm')) {
                    _this3.deleteEle('.xu_prompt');
                    opts.confirmBtn && opts.confirmBtn.fn && opts.confirmBtn.fn();
                };
            });
        }
    };

    w.xui = new Xui();
})(window);

/*
here is a calendar plugin
*/
;(function (w) {
    function calendar() {
        xui.deleteEle('.xui_calendar_picker');
        cal.config = {};
        var tar = new Date();
        var t = {
            y: tar.getFullYear(),
            m: tar.getMonth() + 1
        };
        cal.config.year = t.y;
        cal.config.month = t.m;
        cal.config = Object.assign({}, cal.config, arguments[0]);
        // 是否禁止点击
        var ele = document.getElementById(cal.config.id),
            child = ele && ele.children[0];
        if (ele.getAttribute('disabled')) {
            return;
        };
        //初始化日历
        cal.init();
        document.body.onclick = function (e) {
            var o = e.target.classList;
            var isClose = o.contains('xui_date_input') || o.contains('xui_calendar_icon') || o.contains('xui_date_picker');
            if (!isClose) {
                xui.deleteEle('.xui_calendar_picker');
            };
            //remove value
            if (o.contains('xui_close_small')) {
                e.target.parentNode.querySelector('.xui_date_input').value = '';
            };
        };
    };
    var cal = {
        config: {},
        event: function event() {
            var tar = document.querySelector('.xui_calendar_picker');
            tar.addEventListener('click', cal.handleClickCal.bind(this), false);
        },
        handleClickCal: function handleClickCal(e) {
            // e.stopPropagation();
            var that = cal;
            var o = e.target.classList;
            //choose date
            var isChooseDate = !o.contains('xui_calendar_invalid') && (o.contains('xui_calendar_valid') || o.contains('xui_calendar_foot'));
            if (isChooseDate) {
                var date = e.target.getAttribute('data-date');
                that.config.fn && that.config.fn(date);
                xui.deleteEle('.xui_calendar_picker');
                document.body.removeEventListener('click', cal.handleClickCal.bind(this), false);
            };

            //set date
            if (o.contains('xui_calendar_icon')) {
                var _type = e.target.getAttribute('data-set');
                that.config.month -= 0;
                that.config.year -= 0;
                if (_type == 1) {
                    that.config.month -= 1;
                    if (that.config.month < 1) {
                        that.config.month = 12;
                        that.config.year--;
                    };
                };
                _type == 2 && (that.config.year -= 1);
                _type == 3 && (that.config.year += 1);
                if (_type == 4) {
                    console.log(that.config.month);
                    that.config.month += 1;
                    console.log(that.config.month);
                    if (that.config.month > 12) {
                        that.config.month = 1;
                        that.config.year++;
                    };
                };
                that.renderHTML(that.config.year, that.config.month);
            };
            //remove calendar
            if (e.target.className == '') {
                xui.deleteEle('.xui_calendar_picker');
                document.body.removeEventListener('click', cal.handleClickCal.bind(this), false);
            };
        },
        removeCal: function removeCal() {
            var del = document.getElementById(this.config.id).parentNode;
            var eact = del.querySelectorAll('.xui_calendar_picker');
            if (eact.length) {
                for (var d = 0; d < eact.length; d++) {
                    eact[d] && eact[d].remove();
                    // document.querySelector('.xui_calendar_picker') && document.querySelector('.xui_calendar_picker').removeEventListener('click', cal.test, false)
                    document.body.removeEventListener('click', cal.handleClickCal, false);
                };
            };
        },
        renderHTML: function renderHTML(year, month) {
            this.removeCal();
            //换行标志位
            var tag = 0,
                lTag = 0;
            //总的表格数
            var totalNum = 42;
            var tar = new Date();
            var t = {
                y: year,
                m: month
            };
            var firstDay = new Date(t.y + '-' + t.m).getDay(),
                allDays = new Date(t.y, t.m, 0).getDate();
            var tds = '<tr>';
            //prev month
            if (this.config.isOtherMonths) {
                var lastDays = new Date(t.y, t.m - 1, 0).getDate();
                for (var i = firstDay - 1; i >= 0; i--) {
                    tag++;
                    lTag++;
                    var prevd = month == 1 ? t.y - 1 + '-12-' + (lastDays - i) : t.y + '-' + this.setNum(t.m - 1) + '-' + (lastDays - i);
                    var isStarted = '',
                        isEnded = '';
                    if (this.config.startDate) {
                        if (new Date(prevd) < new Date(this.config.startDate) || new Date(prevd) > new Date(this.config.endDate)) {
                            isStarted = 'xui_calendar_invalid';
                        };
                    };
                    if (this.config.endDate) {
                        isEnded = new Date(this.config.endDate) > new Date(prevd) ? '' : 'xui_calendar_invalid';
                    };
                    tds += '\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div data-date=' + prevd + ' title=' + prevd + ' class="xui_calendar_valid xui_calendar_prev ' + isStarted + ' ' + isStarted + '">\n\t\t\t\t\t\t\t\t' + (lastDays - i) + '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t';
                    if (tag % 7 == 0) {
                        tds += '</tr><tr>';
                    };
                };
            } else {
                for (var _i2 = firstDay - 1; _i2 >= 0; _i2--) {
                    tag++;
                    lTag++;
                    tds += '<td><div></div></td>';
                    if (tag % 7 == 0) {
                        tds += '</tr><tr>';
                    };
                };
            };
            //current month
            for (var j = 1; j <= allDays; j++) {
                tag++;
                lTag++;
                var currd = t.y + '-' + this.setNum(t.m) + '-' + this.setNum(j);
                var _isStarted = '',
                    _isEnded = '',
                    isSelected = '';
                if (this.config.startDate) {
                    _isStarted = new Date(this.config.startDate) < new Date(currd) ? '' : 'xui_calendar_invalid';
                };
                if (this.config.endDate) {
                    _isEnded = new Date(this.config.endDate) > new Date(currd) ? '' : 'xui_calendar_invalid';
                };
                isSelected = j == tar.getDate() ? 'xui_calendar_selected' : '';
                tds += '\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div data-date=' + currd + ' title=' + currd + ' class="xui_calendar_valid ' + _isStarted + ' ' + _isEnded + ' ' + isSelected + '">\n\t\t\t\t\t\t\t' + j + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t';
                if (tag % 7 == 0) {
                    tds += '</tr><tr>';
                };
            };
            //next month
            if (this.config.isOtherMonths) {
                for (var k = 1; k <= totalNum - lTag; k++) {
                    tag++;
                    var nextd = month != 12 ? t.y + '-' + this.setNum(t.m + 1) + '-' + this.setNum(k) : t.y + 1 + '-01-' + this.setNum(k);
                    var _isStarted2 = '',
                        _isEnded2 = '';
                    if (this.config.startDate) {
                        _isStarted2 = new Date(this.config.startDate) < new Date(nextd) ? '' : 'xui_calendar_invalid';
                    };
                    if (this.config.endDate) {
                        _isEnded2 = new Date(this.config.endDate) > new Date(nextd) ? '' : 'xui_calendar_invalid';
                    };
                    tds += '\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div data-date=' + nextd + ' title=' + nextd + ' class="xui_calendar_valid xui_calendar_next ' + _isStarted2 + ' ' + _isEnded2 + '">\n\t\t\t\t\t\t\t\t' + k + '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t';
                    if (tag % 7 == 0) {
                        tds += '</tr><tr>';
                    };
                };
            } else {
                for (var _k = 1; _k <= totalNum - lTag; _k++) {
                    tag++;
                    tds += '<td><div></div></td>';
                    if (tag % 7 == 0) {
                        tds += '</tr><tr>';
                    };
                };
            };
            //是否显示今天
            var isToday = '';
            if (this.config.isToday) {
                var istoDay = '';;
                var tDate = t.y + '-' + this.setNum(t.m) + '-' + this.setNum(tar.getDate());
                if (this.config.startDate) {
                    if (new Date(tDate) < new Date(this.config.startDate) || new Date(tDate) > new Date(this.config.endDate)) {
                        istoDay = 'xui_calendar_invalid';
                    };
                };
                isToday = '\n\t\t\t\t\t<div class="xui_calendar_foot ' + istoDay + '" data-date=' + tDate + '>\n\t\t\t\t\t\ttoday\n\t\t\t\t\t</div>\n\t\t\t\t';
            }
            var calHTML = '\n\t\t\t\t\t<div class="xui_calendar_head">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div data-set=1 title="month" class="xui_calendar_icon xui_calendar_left"></div>\n\t\t\t\t\t\t\t<div data-set=2 title="year" class="xui_calendar_icon xui_calendar_icon_year xui_calendar_left"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="xui_calendar_choose">' + year + '\u5E74' + this.setNum(month) + '\u6708</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div data-set=3 title="year" class="xui_calendar_icon xui_calendar_icon_year xui_calendar_right"></div>\n\t\t\t\t\t\t\t<div data-set=4 title="month" class="xui_calendar_icon xui_calendar_right"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="xui_calendar_body">\n\t\t\t\t\t\t<table>\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Su</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Mo</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Tu</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">We</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Th</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Fr</th>\n\t\t\t\t\t\t\t\t\t<th class="xui_calendar_th">Sa</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t' + tds + '\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t\t' + isToday + '\n\t\t\t';
            var con = document.createElement('div');
            con.classList.add('xui_calendar_picker');
            con.innerHTML = calHTML;
            // let close = document.createElement('span');
            // close.classList.add('xui_close_small');
            // close.setAttribute('data-date','');
            // document.getElementById(this.config.id).after(close);
            document.getElementById(this.config.id).after(con);
            this.event();
        },
        setNum: function setNum(num) {
            return num < 10 ? '0' + num : num;
        },
        init: function init() {
            var y = this.config.year,
                m = this.config.month;
            this.renderHTML(y, m);
        }
    };
    xui.__proto__.calendar = calendar;
})(window);

/*
here is a page plugin
*/
;(function (w) {
    function Page() {
        var args = arguments[0];
        var that = this;
        if (!args.id) {
            throw new Error("element'id is required");
        };
        if (!args.total) {
            throw new Error("total is required");
        };
        that.id = args.id;
        that.index = args.index || 1;
        that.total = args.total;
        that.isShowDot = args.isShowDot;
        that.isShowNum = args.isShowNum;
        that.isJumpPage = args.isJumpPage;

        that.renderHTML(that.index);
        this.event();
    };
    Page.prototype.event = function () {
        var tar = document.getElementById(this.id);
        tar.addEventListener('click', this.handleClick.bind(this), false);
        tar.addEventListener('keyup', this.handleEnter.bind(this), false);
    };
    Page.prototype.handleEnter = function (e) {
        var reg = /^\d{1,}$/,
            val = e.target.value;
        if (!reg.test(val) || val == 0) {
            e.target.value = '';
        };
        if (e.keyCode == 13) {
            val = val > this.total ? this.total : val;
            this.renderHTML(val);
        };
    };
    Page.prototype.handleClick = function (e) {
        var tar = e.target;
        var ele = tar.classList;
        if (ele.contains('xui_page_valid')) {
            var index = tar.getAttribute('data-num');
            this.onClick(index);
            this.renderHTML(index);
        };
    };
    Page.prototype.renderHTML = function (index) {
        index -= 0;
        var tot = this.total;
        // 循环中间的5个数字
        var spans = '';
        var tag = 0;
        if (index < 3) {
            tag = 1;
        } else if (index <= tot - 2) {
            tag = index - 2;
        } else if (index > tot - 2) {
            tag = index - 3;
            tag = tag > tot - 4 ? tot - 4 : tag;
        };
        for (var i = tag; i < tag + 5; i++) {
            var isSelected = '';
            isSelected = index == i ? 'xui_page_selected' : '';
            spans += '\n\t\t\t\t<span class="xui_page_valid ' + isSelected + '" title=' + i + ' data-num=' + i + '>' + i + '</span>\n\t\t\t';
        };
        /*
  提供配置选项,分别是是否展示..., 分页数字,go快捷选项
  */
        var isShowPrevDot = '',
            isShowLastDot = '',
            isShowNumber = '',
            isJumpPage = '';
        if (this.isShowDot && index > 3) {
            isShowPrevDot = '<span class="xui_page_initial">...</span>';
        };
        if (this.isShowDot && index < tot - 2) {
            isShowLastDot = '<span class="xui_page_initial">...</span>';
        };
        if (this.isShowNum) {
            isShowNumber = '<span class="xui_page_initial">' + index + '/' + this.total + '</span>';
        };
        if (this.isJumpPage) {
            isJumpPage = '<input type="text" class="xui_input xui_page_go" placeholder="go" />\n\t    \t';
        };
        var isPrevInvalid = '',
            isLastInvalid = '';
        isPrevInvalid = index == 1 ? 'xui_page_invalid' : 'xui_page_valid';
        isLastInvalid = index == this.total ? 'xui_page_invalid' : 'xui_page_valid';
        var page = '\n\t\t\t<div class="xui_page_content">\n\t\t\t\t<span class="xui_page_nav ' + isPrevInvalid + '" title="First Page" data-num=1>First</span>\n\t\t\t\t<span class="xui_page_nav ' + isPrevInvalid + '" title="Previous Page" data-num=' + (index - 1) + '>Prev</span>\n\t\t\t\t' + isShowPrevDot + '\n\t\t\t\t' + spans + '\n\t\t\t\t' + isShowLastDot + '\n\t\t\t\t<span class="xui_page_nav ' + isLastInvalid + '" title="Next Page" data-num=' + (index + 1) + '>Next</span>\n\t\t\t\t<span class="xui_page_nav ' + isLastInvalid + '" title="Last Page" data-num=' + this.total + '>Last</span>\n\t\t\t\t' + isJumpPage + '\n\t\t\t\t' + isShowNumber + '\n\t\t\t</div>\n\t\t';

        document.getElementById(this.id).innerHTML = page;
    };
    xui.__proto__.pagination = Page;
})(window);

/*
here is a slider plugin
*/
;(function (w) {
    function Slider() {
        var defaults = {
            index: 0,
            duration: 3000,
            isShowDot: true,
            isShowSwitch: false,
            animation: '.5s linear',
            timer: null
        };
        var args = arguments[0];
        defaults = Object.assign({}, defaults, args);
        this.defaults = defaults;
        this.init();
    };
    Slider.prototype.event = function () {
        var ele = document.getElementById(this.defaults.id);
        var dot = ele.querySelector('.xui_slider_dot_con');
        dot.addEventListener('mouseover', this.handleCountAng.bind(this), false);
        dot.addEventListener('mouseout', this.autoAnimated.bind(this), false);

        var ang = ele.querySelector('.xui_slider_tab_con');
        ang.addEventListener('click', this.handleCountAng.bind(this), false);
        ang.addEventListener('mouseout', this.autoAnimated.bind(this), false);
    };
    Slider.prototype.autoAnimated = function () {
        var _this4 = this;

        clearInterval(this.defaults.timer);
        var time = this.defaults.duration;
        this.defaults.timer = setInterval(function () {
            _this4.defaults.index++;
            _this4.defaults.index = _this4.defaults.index > _this4.defaults.imgList.length - 1 ? 0 : _this4.defaults.index;
            _this4.handleChangeImg();
        }, time);
    };
    Slider.prototype.handleCountAng = function (e) {
        clearInterval(this.defaults.timer);
        document.querySelector('.xui_slider_tab_con').removeEventListener('click', this.handleCountAng.bind(this), false);
        if (e.target.classList.contains('xui_slider_dot')) {
            var inx = e.target.getAttribute('data-index');
            this.defaults.index = inx;
            this.handleChangeImg();
        };
        if (e.target.classList.contains('xui_slider_ang')) {
            var _inx = e.target.getAttribute('data-type') - 0;
            this.defaults.index += _inx;
            this.defaults.index = this.defaults.index > this.defaults.imgList.length - 1 ? 0 : this.defaults.index;
            this.defaults.index = this.defaults.index < 0 ? this.defaults.imgList.length - 1 : this.defaults.index;
            this.handleChangeImg();
        };
    };
    Slider.prototype.handleChangeImg = function () {
        //修改圆点的位置
        this.handleChangeDot();
        var each = 100 / (this.defaults.imgList.length - 0);
        var ang = -(each * this.defaults.index) + '%';
        //切换回调
        this.defaults.fn && this.defaults.fn(this.defaults.index);
        //修改图片的位置
        var ele = document.getElementById(this.defaults.id),
            tar = ele.querySelector('.xui_slider_img').style;
        tar.transform = 'translate(' + ang + ')';
        tar.webkitTransform = 'translate(' + ang + ')';
        tar.mozTransform = 'translate(' + ang + ')';
        tar.MsTransform = 'translate(' + ang + ')';
        tar.transition = this.defaults.animation;
        tar.webkitTransition = this.defaults.animation;
    };
    Slider.prototype.handleChangeDot = function () {
        var ele = document.getElementById(this.defaults.id);
        var tar = ele.querySelector('.xui_slider_dot_con');
        var spans = tar.children;
        for (var i = 0; i < spans.length; i++) {
            spans[i].getAttribute('data-index') == this.defaults.index ? spans[i].classList.add('selected') : spans[i].classList.remove('selected');
        };
    };
    Slider.prototype.renderHTML = function () {
        var imgs = this.defaults.imgList,
            list = '',
            spans = '';
        for (var i in imgs) {
            var isSelected = i == 0 ? 'selected' : '';
            list += '\n\t\t\t\t<div><a href=' + imgs[i].link + ' target="_blank"><img src="' + imgs[i].img + '"></a></div>\n\t\t\t';
            spans += '\n\t\t\t\t<span data-index=' + i + ' class="xui_slider_dot ' + isSelected + '"></span>\n\t\t\t';
        };
        var slider = '\n\t\t\t<div class="xui_slider_content">\n\t\t\t\t<div class="xui_slider_img" style="width:' + this.defaults.imgList.length + '00%">\n\t\t\t\t\t' + list + '\n\t\t\t\t</div>\n\t\t\t\t<div class="xui_slider_dot_con ' + (this.defaults.isShowDot ? '' : 'none') + '">\n\t\t\t\t\t' + spans + '\n\t\t\t\t</div>\n\t\t\t\t<div class="xui_slider_tab_con ' + (this.defaults.isShowSwitch ? '' : 'none') + '">\n\t\t\t\t\t<span data-type=-1 class="xui_slider_ang"></span>\n\t\t\t\t\t<span data-type=1 class="xui_slider_ang"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
        document.getElementById(this.defaults.id).innerHTML = slider;
        (this.defaults.isShowDot || this.defaults.isShowSwitch) && this.event();
        this.autoAnimated();
    };
    Slider.prototype.init = function () {
        this.renderHTML();
    };
    xui.__proto__.slider = Slider;
})(window);

/*
here is a scrollLoad plugin
*/
;(function (w) {
    var that = null;
    function Scroll() {
        this.id = arguments.length && arguments[0].id;
        that = this;
    };
    Scroll.prototype.toBottomHeight = function () {
        var diff = 0;
        if (this.getScrollTop() == 0) {
            return this.getClientHeight();
        } else {
            return this.getScrollHeight() - this.getScrollTop() - this.getClientHeight();
        };
    };
    //获取可视区域的高度
    Scroll.prototype.getClientHeight = function () {
        var clientHeight = 0;
        if (that.id) {
            return document.getElementById(that.id).clientHeight;
        };
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        };
        return clientHeight;
    };
    //滚动条当前的位置
    Scroll.prototype.getScrollTop = function () {
        var scrollTop = 0;
        if (that.id) {
            return document.getElementById(that.id).scrollTop;
        };
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        };
        return scrollTop;
    };
    //文档总高度
    Scroll.prototype.getScrollHeight = function () {
        if (that.id) {
            return document.getElementById(that.id).scrollHeight;
        };
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };
    Scroll.prototype.init = function () {
        var tar = that.id ? document.getElementById(that.id) : window;
        tar.onscroll = function () {
            var height = that.toBottomHeight();
            that.onscroll(height);
        };
    };

    xui.__proto__.scroll = Scroll;
})(window);

/*
here is a fullPage plugin
*/
;(function (w) {
    function full() {
        var args = arguments[0];
        var defaults = {
            currentPage: 0,
            direction: 'Y',
            isShowDot: true,
            isBackground: true,
            distance: 60,
            transition: '1s ease',
            colorArr: ['rgb(200,200,169)', 'rgb(131,175,155)', 'rgb(114,111,128)', 'rgb(6,157,128)', 'rgb(252,157,154)', 'rgb(229,187,129)', 'rgb(34,8,7)', 'rgb(227,160,93)', 'rgb(56,13,49)', 'rgb(89,61,67)']
        };
        this.obj = Object.assign({}, defaults, args);
        if (!this.obj.id) {
            throw new Error("element'id is required");
        };
        page.config = this.obj;
        page.config.list = document.getElementById(page.config.id).children;
        if (!page.config.list.length) {
            throw new Error('nothing aha ?');
        };
        page.init();
    };
    var page = {
        config: {},
        event: function event(e) {
            if (e.target.classList.contains('xui_page')) {
                var dir = e.deltaY > 0 ? '1' : '-1';
                this.move(e, dir);
            };
        },
        move: function move(e, direction) {
            var tar = e.target,
                sty = tar.style,
                prev = tar.previousElementSibling && tar.previousElementSibling.style,
                next = tar.nextElementSibling && tar.nextElementSibling.style,
                dir = this.config.direction;
            if (direction == 1) {
                if (tar.nextElementSibling && sty.transform == 'translate' + dir + '(0%)') {
                    sty.transform = 'translate' + dir + '(-100%)';
                    sty.webkitTransform = 'translate' + dir + '(-100%)';
                    next.transform = 'translate' + dir + '(0%)';
                    next.webkitTransform = 'translate' + dir + '(0%)';
                    next.mozTransform = 'translate' + dir + '(0%)';
                    next.transition = this.config.transition;
                    next.webkitTransition = this.config.transition;
                    this.config.fn && this.config.fn(tar, tar.nextElementSibling);
                };
            } else {
                if (tar.previousElementSibling && sty.transform == 'translate' + dir + '(0%)') {
                    sty.transform = 'translate' + dir + '(100%)';
                    sty.webkitTransform = 'translate' + dir + '(100%)';
                    prev.transform = 'translate' + dir + '(0%)';
                    prev.webkitTransform = 'translate' + dir + '(0%)';
                    prev.mozTransform = 'translate' + dir + '(0%)';
                    prev.transition = this.config.transition;
                    prev.webkitTransition = this.config.transition;
                    this.config.fn && this.config.fn(tar, tar.previousElementSibling);
                };
            };
            sty.transition = this.config.transition;
            sty.webkitTransition = this.config.transition;
        },
        init: function init() {
            var _this5 = this;

            var tar = document.getElementById(this.config.id);
            var ele = tar.children,
                dir = this.config.direction;
            var fst = this.config.currentPage;
            for (var i = 0; i < ele.length; i++) {
                ele[i].classList.add('xui_page');
                //一些配置项
                var arr = this.config.colorArr;
                this.config.isBackground && arr.length && (ele[i].style.background = arr[xui.randomNum(0, arr.length - 1)]);
                this.config.isShowDot && ele[i].setAttribute('data-page', i + 1 + '/' + ele.length);
                if (i < fst) {
                    ele[i].style.transform = 'translate' + dir + '(-100%)';
                } else if (i == fst) {
                    ele[i].style.transform = 'translate' + dir + '(0%)';
                } else {
                    ele[i].style.transform = 'translate' + dir + '(100%)';
                };
            };
            w.onwheel = function (e) {
                _this5.event(e);
            };
            if (xui.isMobile()) {
                var startX = 0,
                    endX = 0,
                    startY = 0,
                    endY = 0;
                tar.addEventListener('touchstart', function (e) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                });
                // tar.addEventListener('touchmove',(e)=>{
                //  console.log(e);
                // });
                tar.addEventListener('touchend', function (e) {
                    endX = e.changedTouches[0].pageX;
                    endY = e.changedTouches[0].pageY;
                    var diffX = endX - startX,
                        diffY = endY - startY;
                    var dis = _this5.config.distance;
                    var diff = _this5.config.direction == 'X' ? diffX : diffY;
                    var dir = 0;
                    if (diff > Math.abs(dis)) {
                        dir = -1;
                        _this5.move(e, dir);
                    } else if (diff < -dis) {
                        dir = 1;
                        _this5.move(e, dir);
                    };
                });
            };
        }
    };
    xui.__proto__.fullPage = full;
})(window);

/*
here is a cascader plugin
*/
;(function (w) {
    var Cascader = function () {
        function Cascader() {
            _classCallCheck(this, Cascader);

            this.id = arguments[0].id;
            this.val = {
                v0: '',
                v1: '',
                v2: ''
            };
            this.data = arguments[0].data;
            this.rep = arguments[0].rep;
            this.init();
        }

        _createClass(Cascader, [{
            key: 'event',
            value: function event() {
                var _this6 = this;

                var ele = document.getElementById(this.id),
                    tar = ele.querySelectorAll('.xui_select');

                var _loop2 = function _loop2(i) {
                    tar[i].onchange = function (e) {
                        var val = e.target.value;
                        i == 0 && (_this6.val.v0 = val);
                        i == 1 && (_this6.val.v1 = val);
                        i == 2 && (_this6.val.v2 = val);
                        _this6.renderHTML(val, i);
                        ele.setAttribute('data-value', JSON.stringify(_this6.val));
                    };
                };

                for (var i = 0; i < tar.length; i++) {
                    _loop2(i);
                };
            }
        }, {
            key: 'renderHTML',
            value: function renderHTML(chose, index) {
                var firSelect = '',
                    secSelect = '',
                    thiSelect = '',
                    isEmpty = true;
                firSelect += '<select class="xui_select"><option>\u8BF7\u9009\u62E9</option>';
                secSelect += '<select class="xui_select"><option>\u8BF7\u9009\u62E9</option>';
                thiSelect += '<select class="xui_select"><option>\u8BF7\u9009\u62E9</option>';
                for (var i in this.data) {
                    var f = this.data[i];
                    var a = this.rep.firKey,
                        b = this.rep.firList,
                        c = this.rep.secKey,
                        d = this.rep.secList,
                        e = this.rep.thiKey;
                    firSelect += '<option value=' + f[a] + ' ' + (f[a] == chose ? 'selected' : '') + '>' + f[a] + '</option>';
                    for (var j in f[b]) {
                        var s = f[b][j];
                        if (index == 0) {
                            f[a] == chose && (secSelect += '<option value=' + s[c] + ' ' + (s[c] == chose ? 'selected' : '') + '>' + s[c] + '</option>');
                        } else if (index == 1) {
                            this.val.v0 == f[a] && (secSelect += '<option value=' + s[c] + ' ' + (s[c] == chose ? 'selected' : '') + '>' + s[c] + '</option>');
                        };
                        for (var k in s[d]) {
                            var t = s[d][k];
                            if (this.val.v0 == f[a] && this.val.v1 == s[c]) {
                                isEmpty = false;
                                thiSelect += '<option value=' + t[e] + ' ' + (t[e] == chose ? 'selected' : '') + '>' + t[e] + '</option>';
                            };
                        };
                    };
                };
                firSelect += '</select>';
                secSelect += '</select>';
                thiSelect += '</select>';

                var des = document.getElementById(this.id),
                    sec = des.querySelectorAll('.xui_select');
                if (chose) {
                    if (index == 0) {
                        des.innerHTML = firSelect + secSelect + thiSelect;
                    } else if (index == 1) {
                        sec[1].innerHTML = secSelect;
                        sec[2].innerHTML = thiSelect;
                        if (isEmpty) {
                            sec[2].classList.add('none');
                        } else {
                            sec[2].classList.remove('none');
                        };
                    } else {
                        sec[2].innerHTML = thiSelect;
                    };
                } else {
                    des.innerHTML = firSelect + secSelect + thiSelect;
                };
                this.event();
            }
        }, {
            key: 'init',
            value: function init() {
                this.renderHTML(undefined, 0);
            }
        }]);

        return Cascader;
    }();

    ;
    xui.__proto__.cascader = Cascader;
})(window);

/*
here is a collapse plugin
*/
;(function (w) {
    var Collapse = function () {
        function Collapse() {
            _classCallCheck(this, Collapse);

            if (!arguments[0].id) {
                throw new Error("element'id is required");
            };
            if (!arguments[0].list.length) {
                throw new Error("array is required");
            };
            this.id = arguments[0].id;
            this.isOneTab = typeof arguments[0].isOneTab == 'undefined' ? true : arguments[0].isOneTab;
            this.list = arguments[0].list;
            this.activeTab = (arguments[0].activeTab >= this.list.length ? 0 : arguments[0].activeTab) || 0;
            this.fn = arguments[0].fn;
            this.init();
        }

        _createClass(Collapse, [{
            key: 'event',
            value: function event() {
                var _this7 = this;

                var tar = document.getElementById(this.id);
                tar.onclick = function (e) {
                    var ele = e.target.classList,
                        eleSib = e.target.nextElementSibling;
                    if (ele.contains('xui_collapse_head')) {
                        if (ele.contains('xui_collapse_active')) {
                            ele.remove('xui_collapse_active');
                        } else {
                            _this7.isOneTab && _this7.isShow();
                            ele.add('xui_collapse_active');
                        };
                        console.log();
                        _this7.fn && _this7.fn(e.target, eleSib);
                    };
                };
            }
        }, {
            key: 'isShow',
            value: function isShow() {
                var tar = document.getElementById(this.id);
                tar.querySelectorAll('.xui_collapse_section').forEach(function (item, index) {
                    item.querySelector('.xui_collapse_head').classList.remove('xui_collapse_active');
                });
            }
        }, {
            key: 'renderHTML',
            value: function renderHTML() {
                var divs = '';
                for (var i = 0; i < this.list.length; i++) {
                    var each = this.list[i],
                        activeTab = this.activeTab == i ? 'xui_collapse_active' : '';
                    divs += '\n\t\t\t\t\t<div class="xui_collapse_section">\n\t\t\t\t\t\t<div class="xui_collapse_head ' + activeTab + '">' + each.title + '</div>\n\t\t\t\t\t\t<div class="xui_collapse_body">' + each.content + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t';
                };
                document.getElementById(this.id).innerHTML = divs;
                this.event();
            }
        }, {
            key: 'init',
            value: function init() {
                this.renderHTML();
            }
        }]);

        return Collapse;
    }();

    ;
    xui.__proto__.collapse = Collapse;
})(window);