'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 语法: export default 表达式 注意：一个模块只能有一个默认导出
var name = 'zs';
var age = 20;

function sum() {
    console.log('来了老弟!!!');
}
exports.default = {
    name: name,
    age: age,
    sum: sum
};