// 逐个
// 方式一
// import { myName, sHai } from "./01-export导出";
// import {myName as name1} from "./03-导出冲突";
// console.log(myName,name1);
// sHai()

// 方式二
// import * as mk1 from './01-export导出'
// import { myName } from './03-导出冲突'
// console.log(mk1,myName);


// 统一
// import { num1, num2, person, sum } from "./04-统一导出"
// console.log(sum());
// console.log(num1, num2, person);

// import { n1, qiuHe } from "./04-统一导出";
// console.log(qiuHe());
// console.log(n1);

// 默认
import xxx from './05-默认导出'
console.log(xxx);
xxx.sum()