"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

;

(function (w) {
  function Full() {
    var args = arguments[0];
    var defaults = {
      currentPage: 0,
      direction: 'Y',
      isShowDot: true,
      isBackground: true,
      distance: 60,
      transition: '1s ease',
      colorArr: ['rgba(200,200,169, 0.25)', 'rgba(203, 12, 249, 0.25)', 'rgba(131,175,155, 0.25)', 'rgba(6,157,128, 0.25)', 'rgba(252,157,154, 0.25)', 'rgba(229,187,129, 0.25)', 'rgba(227,160,93, 0.25)', 'rgba(241, 77, 159, 0.25)', 'rgba(228, 101, 243, 0.25)', 'rgba(137, 101, 243, 0.25)', 'rgba(253, 133, 182, 0.25)']
    };
    this.obj = Object.assign({}, defaults, args);

    if (!this.obj.id) {
      throw new Error("element'id is required");
    }

    ;
    page.config = this.obj;
    page.config.list = document.getElementById(page.config.id).children;

    if (!page.config.list.length) {
      throw new Error('nothing aha ?');
    }

    ;
    page.init();
  }

  ;
  var page = {
    config: {},
    event: function event(e) {
      var tar = this.getParentEle(e);

      if (tar.classList.contains('li_page')) {
        var dir = e.deltaY > 0 ? '1' : '-1';
        this.move(tar, dir);
      }

      ;
    },
    getParentEle: function getParentEle(e) {
      var child = e.target;
      var i = 0;

      while (!child.classList.contains('li_page')) {
        i++;
        child = child.parentElement;

        if (i++ > 10) {
          return false;
        }
      }

      ;
      return child;
    },
    move: function move(tar, direction) {
      var sty = tar.style,
          prevEle = tar.previousElementSibling,
          prev = prevEle && prevEle.style,
          nextEle = tar.nextElementSibling,
          next = nextEle && nextEle.style,
          dir = this.config.direction;

      if (direction == 1) {
        if (tar.nextElementSibling && sty.transform == "translate".concat(dir, "(0%)")) {
          sty.transform = "translate".concat(dir, "(-100%)");
          sty.webkitTransform = "translate".concat(dir, "(-100%)");
          next.transform = "translate".concat(dir, "(0%)");
          next.webkitTransform = "translate".concat(dir, "(0%)");
          next.mozTransform = "translate".concat(dir, "(0%)");
          next.transition = this.config.transition;
          next.webkitTransition = this.config.transition;
          nextEle && nextEle.classList.add('show_animation');
          tar && tar.classList.remove('show_animation');
          this.config.fn && this.config.fn(tar, tar.nextElementSibling);
        }

        ;
      } else {
        if (tar.previousElementSibling && sty.transform == "translate".concat(dir, "(0%)")) {
          sty.transform = "translate".concat(dir, "(100%)");
          sty.webkitTransform = "translate".concat(dir, "(100%)");
          prev.transform = "translate".concat(dir, "(0%)");
          prev.webkitTransform = "translate".concat(dir, "(0%)");
          prev.mozTransform = "translate".concat(dir, "(0%)");
          prev.transition = this.config.transition;
          prev.webkitTransition = this.config.transition;
          prevEle && prevEle.classList.add('show_animation');
          tar && tar.classList.remove('show_animation');
          this.config.fn && this.config.fn(tar, tar.previousElementSibling);
        }

        ;
      }

      ;
      sty.transition = this.config.transition;
      sty.webkitTransition = this.config.transition;
    },
    randomNum: function randomNum(min, max) {
      if (typeof min == 'number' && typeof max == 'number' && max > min) {
        return Math.round(Math.random() * (max - min) + min);
      } else {
        throw new Error('must be two numbers or in right order');
      }

      ;
    },
    isMobile: function isMobile() {
      return 'ontouchstart' in window;
    },
    zeroFill: function zeroFill(e) {
      if (e < 0) {
        return e = e > -10 ? '-0' + -e : e;
      } else {
        return e = e < 10 ? '0' + e : e;
      }

      ;
    },
    pastTime: function pastTime() {
      var _this = this;

      var downTime = null;
      var args = arguments[0];

      if (!(args.pastDate && args.target)) {
        throw new Error('date and target are required');
      }

      ;
      args.pastDate = args.pastDate.replace(/\//g, '-');
      clearInterval(downTime);
      downTime = setInterval(function () {
        var start = new Date(args.pastDate),
            end = new Date();
        var diff = (end - start) / 1000;
        var day = parseInt(diff / 24 / 3600, 10),
            hour = parseInt(diff % (24 * 3600) / 3600, 10),
            minute = parseInt(diff % 3600 / 60, 10),
            second = parseInt(diff % 60, 10);
        day = _this.zeroFill(day);
        hour = _this.zeroFill(hour);
        minute = _this.zeroFill(minute);
        second = _this.zeroFill(second);

        function addNode(tar, nodeName) {
          return '<' + nodeName + '>' + tar + '</' + nodeName + '>';
        }

        ;

        if (args.nodeName) {
          day = addNode(day, args.nodeName);
          hour = addNode(hour, args.nodeName);
          minute = addNode(minute, args.nodeName);
          second = addNode(second, args.nodeName);
        }

        ;
        document.querySelectorAll('.' + args.target).forEach(function (item, index) {
          item.innerHTML = day + '天' + hour + '时' + minute + '分' + second + '秒';
        });
      }, 1000);
    },
    deleteEle: function deleteEle(ele) {
      var tar = document.querySelectorAll(ele);

      if (tar.length) {
        var list = _toConsumableArray(tar);

        for (var i in list) {
          if (list.hasOwnProperty(i)) {
            list[i].remove();
          }

          ;
        }

        ;
      }

      ;
    },
    loading: function loading(isShow, ele, string) {
      this.deleteEle('.xui_loading');

      if (!isShow) {
        return;
      }

      ;
      var tar = document.createElement('div');
      tar.innerHTML = "\n                <div>\n                    <div class=\"fence fence1\"></div>\n                    <div class=\"fence fence2\"></div>\n                    <div class=\"fence fence3\"></div>\n                    <div class=\"fence fence4\"></div>\n                    <div class=\"fence fence5\"></div>\n                    <div class=\"fence fence6\"></div>\n                </div>\n                ".concat(string ? "<div>".concat(string, "</div>") : "", "\n            ");
      tar.classList.add('xui_loading');

      if (typeof ele == 'string') {
        tar.classList.add('xui_part_loading');
        document.querySelector(ele).appendChild(tar);
      } else {
        document.body.appendChild(tar);
      }

      ;
    },
    init: function init() {
      var _this2 = this;

      var tar = document.getElementById(this.config.id);
      var ele = tar.children,
          dir = this.config.direction;
      var fst = this.config.currentPage;

      for (var i = 0; i < ele.length; i++) {
        ele[i].classList.add('li_page');
        i === 0 && ele[0].classList.add('show_animation'); //some options

        var arr = this.config.colorArr;
        this.config.isBackground && arr.length && (ele[i].style.background = arr[this.randomNum(0, arr.length - 1)]);
        this.config.isShowDot && ele[i].setAttribute('data-page', "".concat(i + 1, "/").concat(ele.length));

        if (i < fst) {
          ele[i].style.transform = "translate".concat(dir, "(-100%)");
        } else if (i == fst) {
          ele[i].style.transform = "translate".concat(dir, "(0%)");
        } else {
          ele[i].style.transform = "translate".concat(dir, "(100%)");
        }

        ;
      }

      ;

      tar.onwheel = function (e) {
        _this2.event(e);
      };

      if (this.isMobile()) {
        var startX = 0,
            endX = 0,
            startY = 0,
            endY = 0;
        tar.addEventListener('touchstart', function (e) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
        });
        tar.addEventListener('touchend', function (e) {
          endX = e.changedTouches[0].pageX;
          endY = e.changedTouches[0].pageY;
          var diffX = endX - startX,
              diffY = endY - startY;
          var dis = _this2.config.distance;
          var diff = _this2.config.direction == 'X' ? diffX : diffY;
          var dir = 0;

          var tar = _this2.getParentEle(e);

          if (diff > Math.abs(dis)) {
            dir = -1;

            _this2.move(tar, dir);
          } else if (diff < -dis) {
            dir = 1;

            _this2.move(tar, dir);
          }

          ;
        });
      }

      ;
    }
  };
  w.fullPage = Full;
  w.pastTime = page.pastTime.bind(page);
  w.loading = page.loading.bind(page);
})(window);