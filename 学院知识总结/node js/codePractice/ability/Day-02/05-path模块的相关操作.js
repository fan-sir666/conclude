const path = require('path');

// 获取默认路径的分隔符
const separator = path.sep
console.log(separator);

// 获取路径的最后一部分不包含文件格式
const fileName = path.basename(__filename)
console.log(fileName);

// 获取文件的路径 
const fileSrc = path.dirname(__filename)
console.log(fileSrc);

// 获取文件扩展名
const expandedName = path.extname(__filename)
console.log(expandedName);