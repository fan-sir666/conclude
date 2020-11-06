# 知识点总结

## setup函数
```text
1.setup函数是Vue3中新增的函数，它是我们在编写组件时，使用Composition API(组合API)的入口。
2.setup函数是处于生命周期函数beforeCreate和Created两个钩子函数之间的函数，也就是说在setup函数中是无法使用data和methods中的数据和方法的
3.在setup函数中定义的变量和方法最后都是需要return出去的，不然无法在模板中使用
```
```vue
<template>
<!-- 传值组件 -->
  <vSetup msg="你好"></vSetup>

<!-- 使用组件 -->
  <div>{{ msg }}</div>
</template>

<script>
export default {
// 参数
/* 
①props 独立出来作为第一个参数，可以让 TypeScript 对 props 单独做类型推导，不会和上下文中的其他属性相混淆。这也使得 setup 、 render 和其他使用了 TSX 的函数式组件的签名保持一致。
②context作为第二个参数,由于我们不能在setup函数中使用data和methods，所以vue为了避免我们错误的使用，直接将setup函数中的this修改成了undefined
 */

 props: ["msg"],
  setup(props, context) {
    // 该函数接收 props 作为其第一个参数
    console.log(props);
    // 第二个参数提供了一个上下文对象(context)，从原来 2.x 中 this 选择性地暴露了一些 property。
    console.log(context);
  }
}
</script>
```
## 响应式系统API(只要在入口setup中使用的API都需要引入vue并从中解构出来)
### `ref 和 reactive`
```vue
<template>
  <div @click="jShao">点我介绍:{{ jshao }}</div>
</template>

<script>
// 导入API
import { ref, reactive } from "vue";
export default {
    // 入口 
  setup() {
    // 声明基本类型数据
    let jshao = ref("");
    let str = ref("100万元");
    // 声明复杂类型数据
    let obj = reactive({
      name: "张三",
      age: 20
    });
    let arr = reactive(["英语","数学"]);
    function jShao() {
      //   console.log(`我叫${obj.name},今年${obj.age}岁,年收入${str.value}`);
      // 给基本类型赋值
      jshao.value = `我叫${obj.name},今年${obj.age}岁,年收入${str.value},擅长学课${arr[0]}`;
    }

    // 打印基本声明  变量.value   复杂  变量.属性名
    // console.log(str.value, obj);

    return {
      str,
      obj,
      jShao,
      jshao,
      arr
    };
  }
};
</script>

<style>
div {
  font-size: 48px;
}
</style>
```
## `computed`
```vue
<template>
  <div>
    <h3 @click="fn">{{ newNum }}</h3>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    // 要被计算的属性
    let num = ref(1);
    // 打印次数
    let js = ref(1);
    let newNum = computed({
      // 获取 num 发生变化 newNum也跟着计算发生变化
      get() {
        console.log(`第${js.value++}次执行`);
        return num.value + 1;
      },
      // 设置
      set(val) {
        // console.log(val);// 8
        num.value = val - 4;
      }
    });
    function fn() {
      newNum.value = 8;
    }

    return {
      newNum,
      fn
    };
  }
};
</script>

<style>
</style>
```
## `readonly`
```vue
<template>
  <div></div>
</template>

<script>
import {reactive, readonly} from "vue";
export default {
  setup() {
    let obj = reactive({
      name: "张三",
      age: 22
    });
    // readonly 把数据变为只读 不可进行值的修改
    let newobj = readonly(obj);
    newobj.name = "李四";
    console.log(newobj);
  }
};
</script>

<style>
</style>
```
## `watchEffect`(无论监听的属性是否发生变化都会执行一次回调)
```vue
<template>
  <div><p @click="ting">{{num}}</p></div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    let num = ref(1);

    // 监听 特点 : 不管监听的相关属性是否发生变化 一上来先执行一次 
    // 随后一但属性变化 继续执行 变化几次执行几次
    // 返回值 直接调用即可停止监听
    let ting = watchEffect(()=>{
        console.log(`跟踪变化：${num.value}`);  
    })

    setInterval(()=>{
        num.value++;
    },1000);

    return {
      num,
      ting
    };
  }
};
</script>

<style>
p {
    width: 500px;
    height: 400px;
    line-height: 400px;
    font-size: 40px;
    margin: 100px auto;
    border: 1px solid #cccccc;
}
</style>
```
## `watch`(只有监听属性发生变化时才会执行回掉)
```vue
<template>
  <div>
    <p @click="stop">我叫{{ obj.name }},我在成长{{ obj.age }}</p>
  </div>
</template>

<script>
import { reactive,watch } from "vue";
export default {
  setup() {
    let obj = reactive({
      name: "张三",
      age: 18
    });

   setInterval(() => {
      obj.age++;
    }, 1000);


    // 第一个参数 ：监听的属性 第二个参数:回调
    // 特点: 只有在监听的属性发生变化的时候才会执行回调
     let stop = watch(obj, () => {
      console.log(obj.age);
    });

    return {
      obj,
      stop
    };
  }
};
</script>

<style>
p {
    width: 500px;
    height: 400px;
    line-height: 400px;
    font-size: 40px;
    margin: 100px auto;
    border: 1px solid #cccccc;
}
</style>
```