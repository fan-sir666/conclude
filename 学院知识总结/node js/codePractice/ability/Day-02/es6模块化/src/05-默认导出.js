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