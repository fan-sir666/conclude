// 创建文件夹
// fs.mkdir(绝对路径,{ recursive: true },callback)

const fs = require('fs');
fs.mkdir(__dirname + '/wjj', { recursive: true }, (err, path) => {
    if (err != null) {
        console.log(err);
        return
    };
    console.log(path);
    console.log('文件夹创建成功!!!');
})