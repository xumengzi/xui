#方法集合

#### 这里将会是方法集合

* #### 我想验证手机号,咋办?
##### 很简单,只需要传入2个参数,验证类型(名字,手机号,邮件)和对应的`str`,返回一个`boolean`
```js
xu.checkLegal(type, str);
```

* #### 想获取`url`的某个参数呢?
```js
xu.queryString(str);
```

* #### 有时候后台传给我们一个数据库存放的日期,就需要前端来进行转换一下
##### 第一个参数是传入的日期,第二个是`Boolean`,如果是`true`的话就精确到时分秒,否则就是年月日
```js
xu.formatDate(date, bool);
```

* #### 有时候为安全着想,我们需要把字符串符合等编码一下
##### 传入相应的字符串即可, `codeStr`为编码,`decodeStr`为解码.
```js
xu.codeStr(str);
xu.decodeStr(str);
```