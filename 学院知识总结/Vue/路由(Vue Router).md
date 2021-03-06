# Vue Router知识点

## 路由的基本概念
```text
路由的本质就是一种对应关系，比如说我们在url地址中输入我们要访问的url地址之后，浏览器要去请求这个url地址对应的资源。那么url地址和真实的资源之间就有一种对应的关系，就是路由。根据不同的事件来显示不同的页面内容，即事件与事件处理函数之间的对应关系,前端路由主要做的事情就是监听事件并分发执行事件处理函数
```
## 基本配置
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
## 路由重定向(vue-router-redirect)
```js
// 3.定义路由
const routes = [
  // 重定向
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/about", component: About }
];
```
## 嵌套路由(vue-router-nest)
```js
// 2.引入组件
// 父组件
import Home from "../components/Home.vue";
// 子组件
import Zhdlu from "../components/Zhdlu.vue";
import Smdlu from "../components/Smdlu.vue";
// 3.定义路由
const routes = [
  // 重定向
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home ,
  children:[
    { path: "/home", redirect: "/zhdlu" },
    { path: "/zhdlu", component: Zhdlu },
    { path: "/smdlu", component: Smdlu },
  ]
},
];
```
## 路由传参(vue-router-dynamic)
```js
// 3.定义路由
const routes = [
  // 重定向
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  // 路由传参方式一
  // { path: "/about/:id", component: About }
  // 路由传参方式二
  // { path: "/about/:id", component: About, props: true }
  // 路由传参方式三
  {
    path: "/about/:id",
    component: About,
    props: router => ({ id: router.params.id, name: "张三" })
  }
];
```
```vue
<!--App组件(导航组件) -->
<template>
  <router-link class="ljie" to="/about/12345">关于</router-link>
</template>

<!--About组件(对应内容组件) -->
<template>
  <div>
    <!-- 方式一接收参数 -->
    <!-- <h2>我是About组件,id:{{$route.params.id}}</h2> -->
    <!-- 方式二接收参数 -->
    <!-- <h2>我是About组件,id:{{id}}</h2> -->
    <!-- 方式三接收参数 -->
    <h2>我是About组件,id:{{ id }},姓名:{{ name }}</h2>
  </div>
</template>

<script>
export default {
  props: ["id", "name"]
};
</script>

<style></style>
```
## 编程式导航(vue-router-program)
```js
// console.log(this.$router);
//  如果在methods中 在created 在watch这样的方法中 使用this.$router.push() 跳转到指定的路由组件
this.$router.push("/gongsi")

//  如果想前进一步(go(1)、forward()) 后退一步(go(-1)、back())
// this.$router.go(-1);
this.$router.back();
```
## 命名路由(vue-route-named)
```vue
<template>
<!-- 命名路由 -->
    <router-link class="ljie" :to="{ name: 'ho' }">首页</router-link>
    <router-link class="ljie" :to="{ name: 'ab', params: { id: '1234' } }">关于</router-link>
</template>
```
```js
// 2.引入组件
import Home from "../components/Home.vue";
import About from "../components/About.vue";
// 3.定义路由
const routes = [
  { path: "/", redirect: "/home" },
  { name: "ho", path: "/home", component: Home },
  {
    name: "ab",
    path: "/about/:id",
    component: About,
    props: router => ({ id: router.params.id, name: "张三" })
  }
];
```
## 路由懒加载页面
```js
import { createRouter, createWebHashHistory } from "vue-router";
// 导入组件
import Users from "../components/Users.vue"
const routes = [
    { path: "/", redirect: "/users" },
    { path: "/users", component: Users },
    {
        path: "/xiangqing/:id",
        component: () =>
            import ("../components/Xiangqing.vue"),
        props: true
    },
    {
        name: "qx",
        path: "/quanxian",
        // 路由懒加载页面
        component: () =>
            import ("../components/Quanxian.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
```