# 导入导出
1. 逐个导出
```js
// 文件1
export let myName = "范志伟"
// 文件2
export let myName = "模块命名冲突"
```
* 导入
```js
// 方式一 通过解构as别名来解决命名冲突
import {myName} from "文件1"
import {myName as aliasName} from "文件2"

// 方式二
import * as allImport from "文件1"
import {myName} from "文件2"
console.log(allImport.myName,myName)
```
2. 统一导出
```js
let num1 = 10 ,num2 = 20;
let person = {name:'张三',age:20};
function sum() {
    return num1 + num2;
}

// 简写
// export {
//     num1,
//     num2,
//     person,
//     sum
// }

// 完整
export {
    num1 as n1,
    sum as qiuHe
}
```
* 导入
```js
// 对应简写
import { num1, num2, person, sum } from "文件"
// 对应完整
import { n1, qiuHe } from "文件";
```
3. 默认导出
```js
// 语法: export default 表达式 注意：一个模块只能有一个默认导出
let name = 'zs';
let age = 20

function sum() {
    console.log('来了老弟!!!');
}
export default {
    name,
    age,
    sum
}
```
* 导入
```js
import xxx from '文件'
console.log(xxx);
xxx.sum()
```
`总结:`
```text
1. 逐个或统一 必须{}解构
2. import xxx,{yy,zz} from '文件路径',这是混合暴露的引入方式.
    xxx 代表文件含有默认导出
```