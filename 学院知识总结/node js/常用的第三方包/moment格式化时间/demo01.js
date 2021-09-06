const moment = require('moment')

// console.log(moment);


// 获取时间

// 分别获取某一个
// year 年 month 月 date 日 hour 时 minute 分 second 秒 millissecond毫秒 day 星期(0代表星期日)
// week 一年的第几周 quarter 第几季度

// 注意: 上面表示时间的单词都可以拿来用
// 方式一
// console.log(moment().year());

// 方式二
// console.log(moment().get('year'));

// 获取时间戳  X大写表示秒 x小写表示毫秒
// console.log(moment().format('X'));
// console.log(moment().format('x'));

// 获取 年月日时分秒整体 toArray返回数组形式 toObject返回对象形式
// console.log(moment().toArray());
// console.log(moment().toObject());

// 获取上面单词的  startOf 0时0分0秒  endOf 23时59分59秒
// console.log(moment().startOf('day'));
// console.log(moment().endOf('day'));

// 获取当月的天数
// console.log(moment().daysInMonth());
