# Vue Router知识点

## 路由的基本概念
```text
路由的本质就是一种对应关系，比如说我们在url地址中输入我们要访问的url地址之后，浏览器要去请求这个url地址对应的资源。那么url地址和真实的资源之间就有一种对应的关系，就是路由。根据不同的事件来显示不同的页面内容，即事件与事件处理函数之间的对应关系,前端路由主要做的事情就是监听事件并分发执行事件处理函数
```
## 基本使用
```text
Vue Router介绍：它是一个Vue.js官方提供的路由管理器。是一个功能更加强大的前端路由器。Vue Router和Vue.js非常契合，可以一起方便的实现SPA(single page web application,单页应用程序)应用程序的开发。Vue Router依赖于Vue，所以需要先引入Vue，再引入Vue Router。
```
1.下载vue-router
```shell
npm install vue-router@next
```
2.在src文件夹下创建routes文件夹并创建index.js
```js
// 1.引入vue-router
import { createRouter, createWebHashHistory } from "vue-router";
// 2.引入组件
import Home from "../components/Home.vue";
import About from "../components/About.vue";
// 3.定义路由
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
];
// 4.创建路由
const router = createRouter({
  history: createWebHashHistory(),
  // 定义好的路由
  routes
});
// 5.导出路由
export default router;

```
3.将路由挂载到Vue实例中
```js
// 1.导入vue
import { createApp } from "vue";
// 2.导入组件
import App from "./App.vue";
// 3.导入路由
import routes from "./routes/index.js";
// 4.创建实例
const vm = createApp(App);
// 5.把路由挂载到vm实例上
vm.use(routes);
vm.mount("#app");
```
4.添加路由链接:`<router-link>`是路由中提供的标签，默认会被渲染为a标签，to属性默认被渲染为href属性，to属性的值会被渲染为#开头的hash地址
```vue
<template>
  <div class="route">
    <!-- to属性相当于href 添加链接 -->
    <router-link class="ljie" to="/">首页</router-link>
    <router-link class="ljie" to="/about">关于</router-link>
    <!-- 添加路由对应的视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ljie {
  margin: 0 20px;
}
</style>

```