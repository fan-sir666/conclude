# Vue Router知识点

## 路由的基本概念
```text
路由的本质就是一种对应关系，比如说我们在url地址中输入我们要访问的url地址之后，浏览器要去请求这个url地址对应的资源。那么url地址和真实的资源之间就有一种对应的关系，就是路由。根据不同的事件来显示不同的页面内容，即事件与事件处理函数之间的对应关系,前端路由主要做的事情就是监听事件并分发执行事件处理函数
```
## 基本配置
```text
Vue Router介绍：它是一个Vue.js官方提供的路由管理器。是一个功能更加强大的前端路由器。Vue Router和Vue.js非常契合，可以一起方便的实现SPA(single page web application,单页应用程序)应用程序的开发。Vue Router依赖于Vue，所以需要先引入Vue，再引入Vue Router。
```
### vue3 路由4
1. 下载vue-router
```shell
npm install vue-router@4
```
2. 在src文件夹下创建router文件夹并创建index.js
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
3. 将路由挂载到Vue实例中 入口文件
```js
// 1.导入vue
import { createApp } from "vue";
// 2.导入组件
import App from "./App.vue";
// 3.导入路由
import router from "./router/index.js";
// 4.创建实例
const vm = createApp(App);
// 5.把路由挂载到vm实例上
vm.use(router);
vm.mount("#app");
```
4. 添加路由链接:`<router-link>`是路由中提供的标签，默认会被渲染为a标签，to属性默认被渲染为href属性，to属性的值会被渲染为#开头的hash地址
```html
<template>
  <div class="route">
    <!-- to属性相当于href 添加链接 -->
    <router-link class="ljie" to="/">首页</router-link>
    <router-link class="ljie" to="/about">关于</router-link>
    <!-- 添加路由对应的视图 -->
    <router-view></router-view>
  </div>
</template>
<!-- to属性 -->
<router-link to="/home"></router-link> 
<router-link :to="/home"></router-link>
<router-link :to="{path:'/home'}"></router-link>
<router-link :to="{name:'home',params:{userId:'123'}}"></router-link>
<router-link :to="{path:'/home',query:{userId:'123'}}"></router-link>
```
### vue2 路由3
1. 下载vue-router
2. 在src文件夹下创建router文件夹并创建index.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用 VueRouter
Vue.use(VueRouter)

import Home from '../components/Home.vue'
// 路由规则
const routes = [
    // 从定向
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // 懒加载
        component: () =>
            import ('../components/About.vue')
    },
    // 404页面
    {
        path: '*',
        component: () =>
            import ('../components/NotFound.vue')
    },
]

// 创建路由
const router = new VueRouter({
    routes
})
// 导出路由
export default router;
```
3. 将路由挂载到Vue实例中 入口文件
```js
import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```
4. 添加路由链接:`<router-link>`是路由中提供的标签，默认会被渲染为a标签，to属性默认被渲染为href属性，to属性的值会被渲染为#开头的hash地址
```html
<template>
  <div class="route">
    <!-- to属性相当于href 添加链接 -->
    <router-link class="ljie" to="/">首页</router-link>
    <router-link class="ljie" to="/about">关于</router-link>
    <!-- 添加路由对应的视图 -->
    <router-view></router-view>
  </div>
</template>
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
```txt
在router-link上的to属性传值 语法格式
/path?参数名=值
/path/值 --- 需要路由对象提前配置 path:"/path/:参数名"

对应组件接收上
$route.query.参数名
$route.params.参数名
```
```html
<template>
  <div class="route">
    <!-- to属性相当于href 添加链接 -->
    <router-link class="ljie" to="/home?name=张三">首页</router-link>
    <router-link class="ljie" to="/about/12345">关于</router-link>
    <!-- 添加路由对应的视图 -->
    <router-view></router-view>
  </div>
</template>
```
### 方式一 $route
```js
const routes = [
  // 重定向
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/about/:id", component: About }
];
```
```html
<h2>我是Home组件{{$route.query.name}}</h2>
<h2>我是About组件,id:{{$route.params.id}}</h2>
```
### 方式二 props 解耦
```js
const routes = [
  // 重定向
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home, props: router => ({ name: router.query.name }) },
  // { path: "/about/:id", component: About, props: true }
  {
    path: "/about/:id",
    component: About,
    props: router => ({ id: router.params.id, name: "张三" })
  }
];
```
```html
<!-- 这些参数都是从 组件的 props:['name',id] 取过来的 -->
<h2>我是Home组件{{name}}</h2>
<h2>我是About组件,id:{{id}}</h2>
```
## 编程式导航(vue-router-program)
### path跳转
```js
// 字符串
this.$router.push("/login")

// 对象
this.$router.push({path:"/login"})

// 带查询参数，变成 /login?userId=123
this.$router.push({path:"/login",query:{userId:'123'}})

// 注意: 使用path会自动忽略params
```
### name跳转
```js
this.$router.push({ name: '/user', params: { userId: '123' }})
```
### go跳转
```js
//  如果想前进一步(go(1)、forward()) 后退一步(go(-1)、back())
// this.$router.go(-1);
this.$router.back();
```
**注意:**
```js
// vue3.x Composition 的setup钩子函数中
import { useRouter, useRoute } from 'vue-router'
setup() {
  const router = useRouter()
  router.push('/login')
  const route = useRoute()
  route.params.username
}
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
     // 重定向
    { path: "/", redirect: "/users" },
    // 用户
    { path: "/users", component: Users },
    // 权限
    {
        name: "qx",
        path: "/quanxian",
        // 路由懒加载
        component: () =>
            import ("../components/Quanxian.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
```
## 路由前置守卫
```js
// 使用 router.beforeEach 注册一个全局前置守卫
// 应用场景: 在其他页面 如果用户处于未登录的状态 强制登录页
// router.beforeEach((to,from,next)=>)
// 参数to:要跳转到的路由 (路由对象信息)    目标
// 参数from:从哪里跳转的路由 (路由对象信息)  来源
// 函数体 - next()才会让路由正常的跳转切换, next(false)在原地停留, next("强制修改到另一个路由路径上")

router.beforeEach((to, from, next) => {
  // 获取token
  let isAuthenticated = window.sessionStorage.getItem("token");
  // 如果将要去的地方 不是Login 且没有授权 要强制跳转到Login页面
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```
## 404页面
1. 创建一个NotFound页面
```html
<template>
  <img src="../assets/404.png" alt="">
</template>

<script>
export default {

}
</script>

<style scoped>
    img{
        width: 100%;
    }
</style>
```
2. routes的js文件配置
```js
const routes = [
  // ...省略了其他配置
  // 404在最后(规则是从前往后逐个比较path)
  {
    path: "*",
    component: NotFound
  }
]
```
