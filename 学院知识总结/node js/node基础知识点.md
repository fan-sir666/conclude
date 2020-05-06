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