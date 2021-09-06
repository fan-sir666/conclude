const path = require('path')

// 参数时多个字符串
let newPath = path.join('E:', 'c', 'd', './a', '//w', 'x', '../z');
console.log(newPath); // E:\c\d\a\w\z  
// 注意: ../会吃掉上一层路径