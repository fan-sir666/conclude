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
