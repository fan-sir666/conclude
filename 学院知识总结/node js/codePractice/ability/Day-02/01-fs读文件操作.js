// 读文件
// fs.readFile(绝对路径,编码格式,callback)

// 引入模块
const fs = require('fs');

fs.readFile(__dirname + '/read.txt', 'utf8', (err, data) => {
    if (err) return console.log(err.message);
    console.log(data);
})

// 文件信息
// fs.stat(绝对路径,编码格式,callback)
fs.stat(__dirname + '/read.txt', (err, stats) => {
    if (err) return console.log(err.message);
    console.log(stats.size); // 文件大小
    console.log(stats.birthtime); // 创建时间
})

// 文件夹下目录
fs.readdir(__dirname, (err, files) => {
    if (err) return console.log(err.message);
    console.log(files);
})