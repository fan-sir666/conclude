// 比较时间

const moment = require('moment')

const start_date = moment();
const end_date = moment().endOf('day');
console.log(start_date);
console.log(end_date);

const xx = end_date.diff(start_date)
console.log(xx);