// 写文件操作
// fs.writeFile(路径,数据,callback)

const fs = require('fs');

let content = '<h3>来了老弟,我正在写文件!!!</h3>'
fs.writeFile(__dirname + '/index,html', content, err => {
    if (err) return console.log(err.message);
    console.log('文件写入成功!!!');
})

// fs.appendFile(路径,数据,callback)
fs.appendFile(__dirname + '/index,html', 666, (data, err) => {
    if (err) return console.log(`追加失败${err.message}`);
    console.log('追加成功!!!');
})