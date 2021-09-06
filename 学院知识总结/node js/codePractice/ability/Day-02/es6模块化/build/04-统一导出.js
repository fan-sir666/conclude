'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var num1 = 10,
    num2 = 20;
var person = { name: '张三', age: 20 };
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
exports.n1 = num1;
exports.qiuHe = sum;