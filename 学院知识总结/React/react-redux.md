# react的状态管理(redux 单项数据流)

## redux概述
1. 介绍
```txt
Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。它体小精悍（只有2kB，包括依赖）。
```
2. Redux设计思想
```md
1. 唯一数据源 (数据只能存放在initializeState对象中)
2. 保持状态只读
3. 数据改变只能通过纯函数完成
```
3. Redux工作模式
```md
1. Store提供数据存储
2. View负责界面显示
3. Action(对象)表示动作行为信息({ type: "ADD_COUNT" })
4. View中的事件分发Action到Reducer进行处理
```
## 实例
**Store**
```js
// 1. 引入redux
import { createStore } from 'redux'

// 2. 创建初始化数据
const initializeState = {
    count: 0
}

// 3. 创建reducer函数
const reducer = (state = initializeState, action) => {
    // console.log(action);
    // 通过等值判断传过来的标识处理数据
    switch (action.type) {
        case "ADD_COUNT":
            return { count: state.count + 1 }
        case "MINUS_COUNT":
            return { count: state.count - 1 }
        default:
            return state;
    }
}

// 4. 创建store
const store = createStore(reducer)

// 5. 导出store
export default store;
```
**View**
```jsx
import React from 'react';
import styled from 'styled-components'
// 1. 引入store
import store from './store';

class App extends React.Component {
  // 2. 获取store数据
  state = store.getState();

  //#region 4. 数字++ -- 
  handleAdd = () => {
    // 通过dispatch向store传对象标识,以便于处理数据
    store.dispatch({ type: "ADD_COUNT" })
  }
  handleMinus = () => {
    store.dispatch({ type: "MINUS_COUNT" })
  }
  //#endregion

  // 5. 更新数据
  componentDidMount() {
    // subscribe 该方法来监听状态的变化
    store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
    })
  }
  
  render() {
    return (
      <Odiv>
        {/* 3.渲染初始数据 */}
        <h3>数字:{this.state.count}</h3>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleMinus}>-</button>
      </Odiv>
    )
  }
}

//#region 样式组件
const Odiv = styled.div`
margin: 100px auto 0;
width: 500px;
height: 500px;
border: 1px solid #ccc;
button {
  margin-right: 30px;
}
`
//#endregion
export default App;
```
**小结**
```txt
store的产生: 引入redux ->  创建初始化数据对象 -> 创建reducer函数(初始化数据,处理数据标识)
                -> 等值判断action.type数据处理 -> 创建并导出store

store.getState() 获取数据
store.dispatch({ type: "ADD_COUNT" }) 传递处理数据标识
store.subscribe(参数 function) 监听状态 
```
## react-redux插件
## redux-thunk插件
## redux-saga插件


