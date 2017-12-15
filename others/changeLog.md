<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 日志

###### 当前版本: <span class="version"></span>
>版本说明: 第一个数字代表史诗级修改,第二个数字代表新增一个插件或者比较大的改动,第三个数字代表修复bug,新建文档之类

>输入`xui.version`获取当前版本号

###v0.9.0  <span style="font-size: 16px;">2017/12/15</span>
#####新增：     
1.[幻灯片插件](../plugins/slider.md)
>是否兼容现有代码：是

###v0.8.0  <span style="font-size: 16px;">2017/12/13</span>
#####新增：     
1.[分页插件](../plugins/pagination.md)
>是否兼容现有代码：是

###v0.7.0  <span style="font-size: 16px;">2017/12/11</span>
#####新增：     
1.[日历插件](../plugins/calendar.md)
>是否兼容现有代码：是

###v0.6.2  <span style="font-size: 16px;">2017/12/08</span>
#####新增：     
1.[插件模块](../plugins/README.md)新增使用及参数说明
>是否兼容现有代码：是

###v0.6.1  <span style="font-size: 16px;">2017/12/01</span>
#####新增：     
1.[倒计时插件](../plugins/countDown.md)
>是否兼容现有代码：是

###v0.5.1  <span style="font-size: 16px;">2017/11/26</span>
#####新增：     
1.对`cookie`的操作,包括新增,查询,删除.详见[方法](../methods/methods.md)第八条.
>是否兼容现有代码：是

###v0.5.0  <span style="font-size: 16px;">2017/11/18</span>
#####新增：     
1.[下拉框插件](../plugins/dropDown.md)
>是否兼容现有代码：是

###v0.4.0  <span style="font-size: 16px;">2017/11/01</span>
#####修改：     
1.修改挂在在window对象上的方法名`xu`为`xui`

2.[图片预览插件](../plugins/imgShow.md)支持下载修改文件名(同域下)
>是否兼容现有代码：不,需要全面修改

###v0.3.0  <span style="font-size: 16px;">2017/10/16</span>
#####新增：     
1.[tab切换插件](../plugins/tabChange.md)
>是否兼容现有代码：是

###v0.2.0  <span style="font-size: 16px;">2017/09/25</span>
#####新增：     
1.[图片预览插件](../plugins/imgShow.md)
>是否兼容现有代码：是

###v0.1.2  <span style="font-size: 16px;">2017/09/11</span>
#####新增：
1.[常用插件](../plugins/README.md)

###v0.1.1  <span style="font-size: 16px;">2017/08/29</span>
#####新增：
1.[常用方法](../methods/README.md)

###v0.1.0  <span style="font-size: 16px;">2017/08/19</span>
#####新增：
1.[样式规范](../styles/README.md)

###v0.0.1  <span style="font-size: 16px;">2017/08/03</span>
#####新增：     
1.前端框架项目[xui.js](../README.md)

2.[`gitbook`地址](https://www.gitbook.com/@jarveniv/dashboard)


<script>
	document.querySelector('.version').innerHTML = xui.version;
</script>
