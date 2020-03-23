# BOM知识点总结

## BOM组成

```js
BOM(browser Object Model)浏览器对象模型:
  Window : 顶级对象;
    Document 操作网页的;
    Location 操作网址的
    Navigator 操作浏览器的信息和设置的(其实只能获取)
    History  操作浏览器历史记录的
```
## Window的常见事件

```js
// load事件

  功能: 等网页中的所有东西(结构 样式 js代码 img 文字 各种文件)加载完毕 才能执行js代码
  语法: window.onload = function(){}
  语法: window.addEventListener('load',function(){})

  缺点: 因为等的东西太多 所以不能及时的响应事件 这样是不好的(可能时间等的比较长)

// DOMContentLoaded事件

  功能: 等网页中的DOM结构加载完就可以执行
  语法: document.addEventListener("DOMContentLoaded", function (){})

// resize事件

  功能: 只要浏览器大小发生一丁点变化 这个事件就会触发
  语法: window.addEventListener('resize', function (){})
  //列子：
   window.onresize = function () {
      // innerWidth 可以获取浏览器的窗口大小
      if (window.innerWidth <= 800) {
        document.querySelector('.box').style.display = "none";
      } else {
        document.querySelector('.box').style.display = "block";
      }
    }
```
## Window的定时器

```js
// 延时定时器
// 设置
语法: let 定时器的名字(虽说是名字 但其实值是数字) = setTimeout(具名函数, 时间(单位是毫秒1s=1000ms))
// 删除
语法:  clearTimeout(定时器的名字)

// 周期定时器
// 设置
语法: let 定时器的名字(虽说是名字 但其实值是数字) = setInterval(具名函数, 时间(单位是毫秒1s=1000ms))
// 删除
语法:  clearInterval(定时器的名字)
```

## Location对象
![图片1](./img/1551322091638.png)
![图片2](./img/1551322416716.png)

```js
// 方法
// 页面的跳转 保存历史记录
location.assign('URL地址');     // 等价于 location.href
// 替换网页的网址,跳转到新页面面 不保存历史记录
location.replace('URL地址');
// 刷新当前页面
location.reload();
```
## History对象

```js
 history.forward(); // 页面前进
 history.back();    // 页面后退
 history.go();      // +1页面前进一步  -1页面后退一步
```
## Navigator对象
```js
// 获取当前位置信息
navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.longitude, position.coords.latitude);
      // latitude: 34.09967911902231 纬度
      // longitude: 118.79982925738575 经度
    }, function (error) {
      console.log(error);
    })

```
## JS的执行机制
![图片3](./img/js的执行机制.png)


