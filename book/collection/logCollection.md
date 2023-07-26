<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>
<script type="text/javascript" src="../assets/log.js"></script>

# 4.1.2 log collection

>一直以来，前端开发在本地就可以看到各种日志，但是你有没有想过一种情况，客户的站上出现了错误，但是你缺少足够的信息来定位问题，是不是很烦恼
>在`assets`文件夹里可以找到`log.js`

##### `log.js`参数说明:
```js
;(function(w, options){
    //日志代码
})(window, {
    src: string,
    isShowError: boolean,
    isSubStr: boolean,
    collectPercent: number
});
```
* `src`表示日志上报的链接 **必传**
* `isShowError`表示是否屏蔽错误信息, 默认值为`false`, 表示显示错误信息
* `isSubStr`表示是否截取上报信息的长度, 默认超过`2000`字符截取
* `collectPercent`表示日志是否全部上传, 默认全部, 可以配置`0-1`, 表示只收集部分错误信息
* `tips` 可以打开控制台,看到目前上报的错误信息日志, 如`https://xumeng.site/?data=xxx`
* [`window.performance`](http://www.alloyteam.com/2015/09/explore-performance/comment-page-1/)，通过这个可以获取到`DNS`解析，`js`内存，请求资源等（可以知道页面性能）

##### 日志记录数据说明:
```js
//简略信息，需要注意的是并不是所有错误都会包含下面每一项
{
    "errorInfo": {
        "message": 错误的具体信息,
        "fileName": 文件名字,
        "lineNumber": 报错js的行数,
        "colNumber": 报错js的列数,
        "stack": 错误堆栈信息,
        "target": {//错误的目标元素，比如图片未加载出来，这个时候target就会显示当前图片的id，类名等等
            "id": 元素的id,
            "classList": 元素的类名,
            "text": 元素的文本,
            "nodeName": 元素的nodeName,
            "path": 元素的路径，可以用document.querySelector或者$获取到,
        },
        "type": 错误类型,
    },
    "useInfo": {
        "cookieEnabled": 浏览器是否支持cookie,
        "data": 收集日志的时间戳,
        "language": 浏览器的语言信息,
        "location": 页面的链接,
        "platform": 浏览器的平台,
        "product": 浏览器的生产厂商,
        "referrer": 从何而来，比如你从github里的某个链接点到某个可以记录错误日志的页面，此时referrer就是github那个链接,
        "screen": 屏幕分辨率，比如常见的1440px，1920px等等,
        "userAgent": 浏览器的具体信息，诸如可以看到是什么内核，浏览器版本,
    },
    "pageInfo": {
        "memory": {
            "jsHeapSizeLimit": 内存大小限制,
            "totalJSHeapSize": 可使用的内存大小,
            "usedJSHeapSize": JS对象占用的内存，一定是小于totalJSHeapSize的,
        },
        "navigation": {
            "redirectCount": 页面的重定向次数（如果有）,
            "type": 通过什么途径进入的页面，即0-正常进入的页面（非刷新，重定向），1-通过刷新页面，2-通过浏览器前进后退,
        },
        "timing": {
            "loadPage": 页面加载完成的时间，几乎代表了用户看到页面所等待的时间,
            "domReady": 解析dom树花的时间，Google建议一个页面的dom节点不要超过1500个，嵌套层级也不要超过60个,
            "redirect": 重定向的时间，所以拒绝重定向,
            "lookupDomain": DNS解析的时间，DNS预读取做了么,
            "ttfb": 读取第一个字节的时间，也就是time to first byte，如果这个时间很长就直接去找后端吧,
            "request": 内容加载完成的时间，资源有做压缩或者别的操作,
            "loadEvent": 执行onload函数所花费的时间，所以这个函数里面不要写太多,
            "appcache": DNS缓存时间,
            "unloadEvent": 卸载页面花费的时间,
            "connect": TCP建立连接完成握手的时间
        },
    }
}
```

```js
//详细例子，需要注意的是并不是所有错误都会包含下面每一项
{
    "errorInfo": {
        "message": "Uncaught ReferenceError: b is not defined",
        "fileName": "http://localhost:4000/test/amusing/test.html",
        "lineNumber": 4,
        "colNumber": 52,
        "stack": "ReferenceError: b is not defined\n at a (http://localhost:4000/test/amusing/test.html:52:4)\n at http://localhost:4000/test/amusing/test.html:54:3",
        "target": {
            "id": "showImg",
            "classList": "a,b,c",
            "text": "",
            "nodeName": "IMG",
            "path": "html>body>div>div>div>div>div>div>div>section>p>img" 
        },
        "type": "error"
    },
    "useInfo": {
        "cookieEnabled": true,
        "data": "2019-03-08T11:19:36.089Z",
        "language": "en-US",
        "location": "http://localhost:4000/test/amusing/test.html",
        "platform": "MacIntel",
        "product": "Gecko",
        "referrer": "",
        "screen": "1440px",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
    },
    "pageInfo": {
        "memory": {
            "jsHeapSizeLimit": "2080.0MB",
            "totalJSHeapSize": "20.1MB",
            "usedJSHeapSize": "15.9MB"
        },
        "navigation": {
            "redirectCount": "0 times",
            "type": "通过window.location.reload()刷新页面"
        },
        "timing": {
            "loadPage": "0ms",
            "domReady": "0ms",
            "redirect": "0ms",
            "lookupDomain": "0ms",
            "ttfb": "10ms",
            "request": "3ms",
            "loadEvent": "0ms",
            "appcache": "0ms",
            "unloadEvent": "0ms",
            "connect": "0ms"
        }
    }
}
```
* 引用`log.js`，然后配置好发送错误日志的url即可（不用担心跨域）
* 该日志`js`不会屏蔽错误消息，但是可以配置，按下`F12`，可以看到错误的日志信息
* 由于`IE`浏览器对`url`字符长度的限制（2000左右），所以对于超过2000字符长度的情况时会对部分错误日志进行截取
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

1.大部分错误都能被`catch`到，比如使用未声明的变量

<script>
function a(){
    return b;
};
a();
</script>

```js
//常见的错误
function a(){
    return b;
};
a();
```

2.另外当你写`Promise`的时候没有加错误处理函数，如果该函数`reject`抛出错误但是并没有被`catch`到，`log.js`会上报这个错误，比如你这样写：
>说明：当你使用`fetch`时也可以捕获到错误信息

<script>
var promise = new Promise(function(resolve, reject){
    reject('error')
}).then(res =>{
    console.log(res)
});
</script>

```js
//手动reject，看到这里并没有加catch函数，会被日志抓取并上报
var promise = new Promise(function(resolve, reject){
    reject('error') 
}).then(res =>{
    console.log(res)
});
```

3.如果有图片资源没有获取到，`log.js`也会上报这个问题，上报信息包含了该图片到一些基本信息，包括id，类名等等

<img id="id" class="style1 style2 style3" style="width: 300px" src="./not-found.png">

```html
<!--随便写的一个图片地址，这个图片没有展示出来也会被抓取到-->
<img id="id" class="style1 style2 style3" style="width: 300px" src="./not-found.png"> 
```