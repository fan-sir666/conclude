# webpack
[webpack] (https://www.webpackjs.com/)
## 基本使用
### 装包
```shell
npm init -y
npm install webpack webpack-cli --save-dev
```
### 创建并配置webpack.config.js文件
```shell
npm install --save-dev html-webpack-plugin
npm install clean-webpack-plugin --save-dev
```
```js
// 先执行上面的插件命令
const path = require('path');
// 自动生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动清除dist 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口
    entry: './src/index.js',

    // 出口
    output: {
        // 出口路径
        path: path.resolve(__dirname, 'dist'),
        // 输出的文件名称
        filename: 'bundle.js'

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '自动生成html文件'
        })
    ],
}
```
### 在src 文件夹下创建入口文件
```js
console.log('来了老弟好嗨呦!!!');
```
### 在package.json 文件中添加 **"build": "webpack"** 之后执行 npm run build即可
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
```
### 处理css文件
```shell
npm install --save-dev style-loader css-loader
```
```js
const path = require('path');

// 导入自动生成html文件
const htmlWebpackPlugin = require('html-webpack-plugin');
// 导入自动清除dist文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
    mode: "development",
    // 入口
    entry:'./src/main.js',
    // 出口
    output:{
        // 出口的路径
        path:path.resolve(__dirname,'dist'),
        // 输出的文件名称
        filename:'bundle.js'
    },
    // loader
    module:{
        // 规则
        rules:[{
            test:/\.css$/,
            // 切记use 里面的东西有顺序必须这样写否则会报错
            use:['style-loader','css-loader']
        }]
    },
    // 插件
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'自动生成html文件'
        }),
    ]
}
```
### 模拟脚手架创出的demo
1.先执行上面的流程打出基本的架子
2.创建public文件夹
```html
<body>
    <div id="app"></div>
</body>
```
3.在src文件夹下创建入口文件和app.vue
```js
// 入口文件
import {createApp} from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```
```vue
<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
    data(){
        return{
            msg:'哈哈,来了老弟！！！'
        }
    }
}
</script>

<style>
h1{
    font-size: 40px;
    color: yellow;
}
</style>
```
4.执行以下命令安装相关的包
```shell
npm i vue@next 
npm i @vue/compiler-sfc -D
npm i vue-loader-v16 -D
npm i vue-template-compiler -D
```
5.在webpack.config.js 文件中进行配置
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin.js').default;
module.exports = {
    // 开发者环境
    mode:"development",
    // 入口
    entry:'./src/main.js',
    // 出口
    output:{
        // 生成文件的路径
        path:path.resolve(__dirname,'dist'),
        // 输出的文件名称
        filename:'bundle.js'
    },
    // loader
    module:{
        // 规则
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader']
        },{
            test:/\.vue$/,
            loader:'vue-loader-v16'
        }]
    },
    // 插件
    plugins:[
        // 自动dist文件夹
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title:'自动生成Html文件'
            template:'./public/index.html'
        }),
        new VueLoaderPlugin()
    ]

}
```