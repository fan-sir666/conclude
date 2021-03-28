# uniApp知识点

## 介绍

```txt
uni-app 是一个使用 Vue.js 开发所有前端应用的框架。开发者编写一套代码，可发布到 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
``` 
[百度] (https://uniapp.dcloud.io/)

## 使用 uniapp 开发小程序 需要配置网络请求

```js
// 封装uni的网络请求(https://www.npmjs.com/package/@escook/request-miniprogram)
// 1.导入包
import { $http } from '@escook/request-miniprogram'
// 2.把包挂载到uni这个顶级对象上
uni.$http = $http;
// 3.设置基准地址
$http.baseUrl = 'https://www.uinav.com';
// 4.设置请求拦截器(在请求之前 提示 数据正在加载中)
$http.beforeRequest = function (options) {
  // do somethimg...
	uni.showLoading({
	    title: '加载中...'
	});
}

// 5.设置响应拦截器(让提示消失)
$http.afterRequest = function () {
  setTimeout(function () {
      uni.hideLoading();
  }, 2000);
}
```
## 项目搭建（采用封包）
```txt
把 tabBar 相关的 4 个页面放到主包中，其它页面（例如：商品详情页、商品列表页）放到分包中。

在项目根目录中，创建分包的根目录，命名为 subpkg
在 pages.json 中，和 pages 节点平级的位置声明 subPackages 节点，用来定义分包相关的结构：
"subPackages":[
    {
      "root": "subpkg",
      "pages":  [ ]
    }
 ]
在 subpkg 目录上鼠标右键，点击 新建页面 选项，并填写页面的相关信息
```




