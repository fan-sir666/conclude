# 知识点总结

## setup函数
```markdown
1. setup函数是Vue3中新增的函数,作为在组件中使用组合式 API 的入口.该函数在任何生命周期函数之前执行，且函数内部 `this` 为 `undefined`，它不绑定组件实例对象。
2. `setup` 函数的返回值为对象类型，对象中的属性可以在其他选项和模板中使用, 因为对象中的属性会被添加到组件实例对象中。
```
**注意:** 在setup函数中使用的所有组合API都是需要从`vue`中解构出来的.
## 声明响应式数据
```vue
<script>
import { ref, reactive } from "vue";
export default {
  // setup 组合API入口 返回值:对象 ，对象中的属性可直接在模板中使用
  setup() {
    /* 声明响应式数据
      ref : 即可声明基本数据类型也可声明引用数据类型
      reactive : 只能声明引用数据类型
    */
    const price = ref(100);
    const arrList = ref(["香蕉", "苹果", "梨子"]);
    const person = reactive({ name: "张三", age: 35 });
    const newPerson = {name:'李四',age :50}
    const clickHandler = ()=>{
      price.value = 60;
      arrList.value[0] = "哈密瓜";
      for(const key in newPerson){
        person[key] = newPerson[key]
      }
      // 使用ref声明的响应式数据 在修改的时候需要 xxx.value
    }
    return { price, arrList, person ,clickHandler};
  },
};
</script>
```
## 计算属性computed
```vue
<script>
/* 
语法: 
  const 计算属性名 = computed(()=>{依赖数据通过计算返回一个结果,在模板中当作属性直接使用});
  完整写法: computed({get(){获取值函数},set(val){return val}})
*/
</script>
```
`应用场景:全选反选`

## 侦听器watch
```vue
<script>
/* 
语法: 
        监听多个值[]         初始执行一次
            |
  watch(需要监听的属性,callback,{immediate: true})
            |
    ref 声明的基本数据类型 要监听的东西不加.value

    ref ||  reactive 声明的引用数据类型 

            监听数据:  整体  ref需加.value 
            监听数据:  整体下具体的属性 --> 基本数据类型: () => 具体的属性
            监听数据:  整体下具体的属性 --> 引用数据类型: 具体的属性
*/
</script>
```
