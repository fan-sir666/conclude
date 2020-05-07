# Node 基础知识

## Node 介绍

```text
    Node是一个基于Chrome V8引擎的JavaScript代码运行环境。
    注意：在浏览器中全局对象是window，在Node中全局对象是global。
```
## Node的运行环境的搭建

```text
① 下载文件  https://nodejs.org/en/  （Download 12.16.3 LTS ,LTS代表稳定版）
② 查看版本 node -v
③ PATH环境变量 看下图
```
![PATH环境变量](./img/图片1.png)

## 模块化

```js
// Node.js规定一个JavaScript文件就是一个模块，模块内部定义的变量和函数默认情况下在外部无法得到

//模块成员导出：
let num = 10;
module.exports = {
    num : num
}
// 模块成员导入
let a = require('./dc.js');
console.log(a.num);
```
## 系统模块

### fs模块

```js
// 导入fs
const fs = require('fs');
// 读取文件
fs.readFile('./哈哈.txt', 'utf8', function(err, data) {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log(data);
    console.log('文件读取成功了');
})
// 写入文件内容
const sj = '<h1>来了老弟，好嗨呦！！！</h1>';
fs.writeFile('./index.html', sj, function(err) {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log('文件写成功了');
})
// 创建文件夹
fs.mkdir('./哈哈哈', { recursive: true }, function(err) {
    if(err != null){
        console.log(err);
        return;
    }
    console.log('成功');
})
```
### path 模块

```js
// 导入path
const path = require('path');
// 拼接路径
const ImgLj = path.join('img','2.png');
console.log(ImgLj);

// 绝对路径
const fs = require('fs');
const path = require('path');
// 获取绝对路径  __dirname
const lj = path.join(__dirname,'哈哈.txt');
fs.readFile(lj,'utf8',function (err,data) {
    console.log(data);
})
```
### 第三方模块

```js
// 获取第三方模块
npm install 模块名称
// 卸载
npm uninstall package 模块名称
```
## 包的管理

```js
// 创建package.json
npm init

{
  "name": "item",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", // 入口文件
  "dependencies": {
    "jquery": "^3.5.1"
  }, // 项目依赖  就是开发中需要的包  线上也需要的包
  "devDependencies": {
    "less": "^3.11.1"
  },// 开发时的依赖 就是开发中需要的包 线上不需要的包
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
npm install 包名  --save-dev  // 安装开发时的依赖包
```
```text
package-lock.json 的作用：
锁定包的版本，确保再次下载时不会因为包版本不同而产生问题
加快下载速度，因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址，重新安装时只需下载即可，不需要做额外的工作
```
## 模块的加载机制

```js
// 当模块拥有路径但没有后缀时
 1.require方法根据模块路径查找模块，如果是完整路径，直接引入模块
 2.如果模块后缀省略，先找同名JS文件再找同名JS文件夹
 3.如果找到了同名文件夹，找文件夹中的index.js
 4.如果文件夹中没有index.js就会去当前文件夹中的package.json文件中查找main选项中的入口文件
 5.如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到 // Cannot find module './moduleB'
// 当模块没有路径且没有后缀时
 1.Node会假设它是系统模块
 2.Node会去node_modules文件夹中
 3.首先看是否有该名字的JS文件
 4.再看是否有该名字的文件夹
 5.如果是文件夹看里面是否有index.js
 6.如果没有index.js查看该文件夹中的package.json中的main选项确定模块入口文件
 7.否则找不到报错
```
## 服务器

###  C/S架构与B/S架构

```text
B/S架构: Browser(浏览器) <-- -->Server(服务器)，这种软件都是通过浏览器访问一个网站使用，服务器提供数据存储等服务
优点: 部署方便(不用安装)，可维护性强
缺点: 用户体验不好，不能针对每个用户的不同特点进行设置
C/S架构: Client(客户端)  <-- -->Server(服务器)，这种软件通过安装一个软件到电脑，然后使用，服务器提供数据存储等服务
优点: 用户体验好
缺点: 部署不方便(需要安装)，可维护性弱
```
### 请求响应的流程

```text
1.用户打开浏览器
2.地址栏输入我们需要访问的网站地址(URL)
3.浏览器通过DNS服务器 获取即将访问的网站的IP地址
4.浏览器发起一个对这个IP地址的请求
5.服务端监听指定的 端口 的服务器软件接收到这个请求，进行相应的处理
6.服务端将处理完的结果返回给客户端浏览器(响应)
7.浏览器将服务端返回的结果呈现到界面上
```
### node的内置模块Http

```js
// 1.引入http模块
const http = require('http');
// 2.调用方法创建服务器
let server = http.createServer();
// 3.启动服务器，指定服务器要监听的端口号
// 共有三个参数:
// 3.1 第一个参数，指定监听的端口号
// 3.2 第二个参数是服务器的IP地址，默认是本地回环地址，本机IP: 127.0.0.1 对应的域名:localhost
// 3.3 第三个参数是当服务器启动成功后，要执行的回调函数
server.listen(3000, () => {
    console.log('the server is running at http://127.0.0.1:3000');
})
// 4.监听客户端的请求，并处理请求，最后把处理的结果通过网络再响应回客户端浏览器
// 给服务器对象注册一个请求事件，每当有新的客户端请求我们服务器的时候，都会触发这个事件
// req: request的缩写，每当有请求过来的时候，都可以拿这次请求的request对象
// res: response的缩写,可以将服务器端的数据通过这个对象的一些方法返回给浏览器客户端
server.on('request', function (req, res) {
    console.log('有新的请求过来了...');
    res.write('ok'); // 向客户端发送一些数据内容
    res.end(); // 表示服务器端对客户端的数据已经发送完毕了，客户端可以接收并显示了,
               //如果只发送一次的话，可以直接使用res.end('111111');
})
```