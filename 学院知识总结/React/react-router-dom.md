# react 路由的使用及知识点

## 路由的基本使用
1. 安装 react-router-dom 路由插件
2. 在组件中导入路由插件 
3. 路由插件的相关方法 
```txt
HashRouter : 监听路由的变化 在render函数中使用 将Link (链接) 和 Route (视图容器) 包裹起来
Link : 跳转标签  to="跳转地址"  其中to可以是string也可以是对象  {pathname:'/xxx',state:{name:'zs',arr:['dsa','dsa']}} 没有精确匹配
Route : 呈现视图的容器  path="路径" component={要呈现的组件} 和 Link 是成对出现的
```
4. 创建所需组件
5. 引入相关组件 Route 中需要的
6. 书写相关结构 HashRouter > Link + Route
7. 代码实现:
```jsx
import React from 'react'


// 路由的监听方式: BrowserRouter:history模式 H5新特性 ; HashRouter: hash模式兼容性强
// 1.导入路由
import {HashRouter,Link,Route} from 'react-router-dom';

// 2.组件
import Home from './components/Home/index.jsx'
import About from './components/About/index.jsx'


class App extends React.Component{
  render(){
    return(
      // 3.监听路由变化
      <HashRouter>
        {/* 4.Link 跳转标签 */}
        <Link to="/home">去Home</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/about">去About</Link>

        {/* 5.Route 组件承载视图 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </HashRouter>
    )
  }
}


export default App;

```
## 路由插件的 NavLink
1. NavLink的作用
```txt
与Link一样都是跳转标签。
属性:
exact 精确匹配  链接使用了 对应Route也要启用精确匹配
activeStyle 和 activeClassName 都是给跳转标签加样式的 前者行内样式 , 后者类名样式
```
2. 代码示例
```jsx
<NavLink exact activeStyle={{color:'yellow'}} to="/home">去Home</NavLink>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<NavLink exact activeClassName='active' to="/about">去About</NavLink>
```
```css
.active {
    color: red;
}
```
## 路由插件的 Switch
```jsx
<HashRouter>
        <NavLink exact activeStyle={{ color: 'yellow' }} to="/home">去Home</NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink exact activeClassName='active' to="/about">去About</NavLink>
        {/* Switch 将 视图元素 包裹起来 只匹配一个 匹配到就不继续匹配了 */}
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route component={DefaultCom}></Route>
        </Switch>
      </HashRouter>
```
## 重定向
1. 从 react-router-dom 插件中解构出  **Redirect** 方法
2. Redirect 的 to='xxx' 就是我们要取得目标组件
```jsx
import {Redirect} from 'react-router-dom'

class User extends React.Component {
    state = {
        // 未登录
        isLogin:false
    }
    render(){
        let user = <div>我是User页面</div>
        // 通过三元运算符判断状态实现重定向
        return this.state.isLogin ? user : <Redirect to='/login'/>
    }
}

export default User;
```
## 嵌套路由
**注意:** 父路由不可以使用精确匹配  子路由要包含父路由的地址
1. 创建子组件
2. 在父组件中 引入子组件 导入路由插件解构相关方法（NavLink,Route） 并书写路由使用的基本解构

8. 示例代码
```jsx
import React from 'react';

import {NavLink,Route} from 'react-router-dom'

class Home extends React.Component {
    render(){
        return(
            <div>
                <h3>我是Home页面</h3>
                <NavLink exact to="/home/son1">去Son1</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink exact to="/home/son2">去Son2</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <Route exact path="/home/son1" component={HomeSon1}/>
                <Route exact path="/home/son2" component={HomeSon2}/>
            </div>
        )
    }
}

class HomeSon1 extends React.Component {
    render(){
        return(
            <div>我是Home页面的Son1页面</div>
        )
    }
}

class HomeSon2 extends React.Component {
    render(){
        return(
            <div>我是Home页面的Son2页面</div>
        )
    }
}

export default Home;
```
## 手动跳转
1. hash模式跳转
```jsx
window.location.hash = '跳转地址'
```
2.  history模式
```jsx
this.props.history.push("跳转地址")
```
## 路由传参
### URL 传参
1. 传参数
```jsx
{/* 通过跳转标签的to属性 地址?xxx=yyy的形式进行传递 */}
<NavLink to="/home?name=zs&age=18&hobby=football&hobby=pingpang">toHome</NavLink>
```
2. 接收参数
```jsx
state = {
        name:'',
        age:'',
        hobby:[]
    }

    componentDidMount(){
        //  通过 new 这个 URLSearchParams 创建一个实例 , 处理->   参数是 this.props.location.search(xx=yy&ww=zz)
        // URLSearchParams下的get方法来获取xx下的值yy  getAll获取返回一个数组
        const parpms = new URLSearchParams(this.props.location.search);
        this.setState({
            name:parpms.get('name'),
            age:parpms.get('age'),
            hobby:parpms.getAll('hobby'),
        })
    }

    render(){
        return(
            <div>
                <h3>我是Home页面</h3>
                <p>{this.state.name}-----{this.state.age}-----{this.state.hobby}</p>
            </div>
        )
    }
```
### 跳转标签传对象
1. 传参数 对象中的属性 pathname 跳转地址 state参数对象
```jsx
state = {
        paramsObj:{
            pathname:'/user',
            state:{
                name:'zs',
                age:18,
                hobby: ['football', 'pingpang']
            }
        }
    }

<NavLink to={this.state.paramsObj}>toUser</NavLink>
```
2. 接收参数
```jsx
state = {
        paramsObj:{}
    }
    componentDidMount(){
        // console.log(this.props.location.state);
        this.setState({
            paramsObj:this.props.location.state
        })
    }
    render(){
        return(
            <div>
                <h3>我是User页面</h3>
                <p>我叫{this.state.paramsObj.name},今年{this.state.paramsObj.age}岁了,爱好{this.state.paramsObj.hobby}</p>
            </div>
        )
    }
```
### 动态路由传参
1. 传参数
```jsx
 <NavLink to="/about/125485545">toAbout</NavLink>
 <Route path="/about/:id" component={About} />
```
2. 接收参数
```jsx
 state={
        id:''
    }
    componentDidMount(){
        // console.log(this.props.match.params);
        this.setState({
            id:this.props.match.params.id
        })
    }
    render(){
        return(
            <div>
                <h3>我是About页面</h3>
                <p>传过来的Id--{this.state.id}</p>
            </div>
        )
    }
```
## 路由统一管理
1. 安装管理插件 react-router-config
2. 在src下创建routes文件夹
```js
// 1. 导入相关创建
// 2. 创建路由
const routes = [
    // 重定向
    {
        path:'/',
        exact: true,
        component:() => <Redirect to="/home?name=zs&age=18&hobby=football&hobby=pingpang"/>
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/about/:id',
        component:About,
        routes:[
            {path:'/about/:id/my',component:AboutMy},
            {path:'/about/:id/her',component:AboutHer},
        ]
    },
    {
        path:'/user',
        component:User
    }
]
// 3. 导出路由
```
3. 在组件中分别导入 路由插件（NavLink, HashRouter）  路由管理插件 （renderRoutes） 管理路由的js文件（routes）
```jsx
import React, { Fragment } from 'react'

// 导入路由插件
import { NavLink, HashRouter } from 'react-router-dom'
// 导入路由统一管理插件
import {renderRoutes} from 'react-router-config'
// 导入路由
import routes from './routes'

class App extends React.Component {
    state = {
        paramsObj:{
            pathname:'/user',
            state:{
                name:'zs',
                age:18,
                hobby: ['football', 'pingpang']
            }
        }
    }
    render() {
        return (
            <Fragment>
                <HashRouter>
                    {/* 传参方式一 通过URL */}
                    <NavLink to="/home?name=zs&age=18&hobby=football&hobby=pingpang">toHome</NavLink>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* 传参方式二 动态传参 直接/1524854 对应的视图route /:id  */}
                    <NavLink to="/about/125485545">toAbout</NavLink>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* 传参方式三 通过to属性传递一个对象 */}
                    <NavLink to={this.state.paramsObj}>toUser</NavLink>

                    {/* renderRoutes 视图容器 将路由放进去 */}
                    {renderRoutes(routes)}
                </HashRouter>
            </Fragment>
        )
    }
}

export default App;
```
**注意:**
```jsx
{/* 在嵌套路由中 父组件的视图容器 放的不在是引入的routes 而是 props.route.routes ,这样接收数据的组件需在componentDidMount钩子函数中获取和设置数据然后渲染 */}
{renderRoutes(this.props.route.routes)}
// 接收数据的组件:
 state = {
        name: '',
        age: ''
    }
    componentDidMount() {
        let params = new URLSearchParams(this.props.location.state)
        this.setState({
            name: params.get('name'),
            age: params.get('age'),
        })
    }

{/* renderRoutes 使用该方法的第二个参数: 在通过URL传参的情况下: 在 render函数中 统一处理数据,接收参数的组件下直接props.数据的键名即可 */}
 render() {
        // 1.2 通过URLSearchParams的实例对象 处理 this.props.location.search 地址
        let params = new URLSearchParams(this.props.location.search);
        // 1.3 获取相关属性的值
        this.data = {name:params.get('name'),age:params.get('age')}

        return (
            <DivBox>
                <h3>用户管理页面</h3>
                <div className="box-top">
                    {/* URL传参 1.1 */}
                    <NavLink to='/usermanage/web?name=鲁正一&age=22'>鲁正一</NavLink>
                    <NavLink to='/usermanage/vue?name=徐月&age=20'>徐玥</NavLink>
                    <NavLink to='/usermanage/react?name=殷鸿亮&age=33'>殷鸿亮</NavLink>
                    <NavLink to='/usermanage/php?name=刘浩宇&age=25'>徐玥</NavLink>
                </div>
                <div className="box-btm">
                    {/* 1.4 视图层 第二个参数将数据抛出去 */}
                    {renderRoutes(this.props.route.routes,this.data)}
                </div>
            </DivBox>
        )
    }
```


