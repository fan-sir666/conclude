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
### `computed`
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
### `readonly`
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
### `watchEffect`(无论监听的属性是否发生变化都会执行一次回调)
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
### `watch`(只有监听属性发生变化时才会执行回掉)
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
## 回答问题打分案例
### `数据使用的总结`
```text
1. 各个组件中定义的响应式数据 赋值 必须使用 .value
2. 获取xuex中的属性
  ① 如果是简单数据类型：
  let store = useStore();
  let zhqi = store.state.zhqi;

  ② 如果你要获取的数据 在template中会发生变化 无论简单类型还是复杂类型 都用computed方式获取
  简单类型:
   let itemHao = computed(() => {
      return store.state.itemHao;
    });
  复杂类型:
  let itemissue = computed(() => {
      return store.state.itemissue;
    });
  在使用获取来的属性时 因为他要在视图层发生变化且为响应式数据 使用时必须加 .value
   let itemTg = computed(() => {
      return itemissue.value[itemHao.value - 1].topic_name;
    });
```
### 首页
```vue
<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">{{ zhqi }}</span>
      </header>
      <!-- 首页内容 -->
      <div>
        <div class="home_logo item_container_style"></div>
        <router-link to="/item" class="start button_style"></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    // vuex对象
    let store = useStore();
    //#region 获取周期
    let zhqi = store.state.zhqi;
    // console.log(zhqi);
    //#endregion

    //#region 调用清除itemtj的方法clearData
    store.commit("clearData");
    //#endregion

    return {
      zhqi
    };
  }
};
</script>

<style lang="scss">
.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.top_tips {
  position: absolute;
  height: 7.35rem;
  width: 3.25rem;
  top: -1.3rem;
  right: 1.6rem;
  background: url("/images/WechatIMG2.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  .num_tip {
    position: absolute;
    left: 0.48rem;
    bottom: 1.1rem;
    height: 0.7rem;
    width: 2.5rem;
    font-size: 0.6rem;
    font-family: "黑体";
    font-weight: 600;
    color: #a57c50;
    text-align: center;
  }
}

.item_container_style {
  height: 11.625rem;
  width: 13.15rem;
  background-repeat: no-repeat;
  position: absolute;
  top: 4.1rem;
  left: 1rem;
}
.home_logo {
  background-image: url("/images/1-2.png");
  background-size: 13.142rem 100%;
  background-position: right center;
}

.button_style {
  display: block;
  height: 2.1rem;
  width: 4.35rem;
  background-size: 100% 100%;
  position: absolute;
  top: 16.5rem;
  left: 50%;
  margin-left: -2.4rem;
  background-repeat: no-repeat;
}
.start {
  background-image: url("/images/1-4.png");
}
</style>

```
### 答题页
```vue
<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">题目{{ itemHao }}</span>
      </header>
      <!-- 题目内容 -->
      <div class="item_back item_container_style">
        <div class="item_list_container" v-if="itemissue.length > 0">
          <!-- 题干 -->
          <header class="item_title">{{ itemTg }}</header>
          <!-- 选项 -->
          <ul>
            <li
              class="item_list"
              v-for="(item, index) in itemissue[itemHao - 1].topic_answer"
              :key="item.topic_answer_id"
              @click="addYs(index, item.topic_answer_id)"
            >
              <span
                class="option_style"
                :class="{ has_choosed: dtSy == index }"
                >{{ String.fromCharCode(65 + index) }}</span
              >
              <span class="option_detail">{{ item.answer_name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 下一题按钮 -->
      <span
        class="next_item button_style"
        v-if="itemHao < itemissue.length"
        @click="itemNext"
      ></span>
      <!-- 提交按钮 -->
      <span class="submit_item button_style" @click="itemSub" v-else></span>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
export default {
  // data() {
  //   return {
  //     dtSy: null,
  //     dtId: null
  //   };
  // },
  setup() {
    // vuex对象
    let store = useStore();
    // 路由对象
    let router = useRouter();

    // 调用getData方法
    store.dispatch("getData");

    //#region 获取itemHao属性
    let itemHao = computed(() => {
      return store.state.itemHao;
    });
    //#endregion

    //#region 获取itemissue属性
    let itemissue = computed(() => {
      return store.state.itemissue;
    });
    // console.log(itemissue);
    let itemTg = computed(() => {
      return itemissue.value[itemHao.value - 1].topic_name;
    });
    //#endregion

    //#region
    let dtSy = ref(null);
    let dtId = ref(null);
    // 添加答题样式
    function addYs(index, id) {
      dtSy.value = index;
      dtId.value = id;
    }
    // 下一题
    function itemNext() {
      if (dtSy.value != null) {
        dtSy.value = null;
        store.dispatch("addTijiao", dtId.value);
      } else {
        alert("请作答习题!!!");
      }
    }
    // 提交
    function itemSub() {
      if (dtSy.value != null) {
        dtSy.value = null;
        store.dispatch("addTijiao", dtId.value);
        router.push("/score");
      } else {
        alert("请作答习题!!!");
      }
    }
    //#endregion

    return {
      itemHao,
      itemissue,
      itemTg,
      addYs,
      itemNext,
      itemSub,
      dtSy
    };
  }
  // computed: {
  //   // ...mapState(["itemHao", "itemissue"]),
  //   // 题干属性
  //   // itemTg() {
  //   //   return this.itemissue[this.itemHao - 1].topic_name;
  //   // }
  // },
  // created() {
  //   // 获取数据
  //   this.$store.dispatch("getData");
  // },
  // methods: {
  // 添加答题样式
  // addYs(index, id) {
  //   this.dtSy = index;
  //   this.dtId = id;
  // },
  // 下一题
  // itemNext() {
  //   if (this.dtSy != null) {
  //     this.dtSy = null;
  //     this.$store.dispatch("addTijiao", this.dtId);
  //   } else {
  //     alert("请作答习题!!!");
  //   }
  // },
  // 提交
  // itemSub() {
  //   if (this.dtSy != null) {
  //     this.dtSy = null;
  //     this.$store.dispatch("addTijiao", this.dtId);
  //     this.$router.push("/score");
  //   } else {
  //     alert("请作答习题!!!");
  //   }
  // }
  // }
};
</script>

<style lang="scss">
.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.next_item {
  background-image: url("/images/2-2.png");
}

.submit_item {
  background-image: url("/images/3-1.png");
}

.item_back {
  background-image: url("/images/2-1.png");
  background-size: 100% 100%;
}

.item_title {
  font-size: 0.65rem;
  color: #fff;
  line-height: 0.7rem;
}

.item_list_container {
  margin: 2.5rem;
  padding: 0;
}

.item_list {
  font-size: 0;
  margin-top: 0.4rem;
  width: 10rem;
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: #fff;
    vertical-align: middle;
  }
  .option_style {
    height: 0.725rem;
    width: 0.725rem;
    border: 1px solid #fff;
    border-radius: 50%;
    line-height: 0.725rem;
    text-align: center;
    margin-right: 0.3rem;
    font-size: 0.5rem;
    font-family: "Arial";
  }
  .has_choosed {
    background-color: #ffd400;
    color: #575757;
    border-color: #ffd400;
  }
  .option_detail {
    width: 7.5rem;
    padding-top: 0.11rem;
  }
}
</style>

```
### 打分页
```vue
<template>
  <div class="score_container">
    <!-- 分数 -->
    <div class="your_scores_container">
      <header class="your_scores">
        <span class="score_num">{{ score }}</span>
        <span class="fenshu">分!</span>
      </header>
      <div class="result_tip">{{ scoreTs }}</div>
    </div>

    <div class="share_button" @click="zlYc">再来一次</div>

    <div class="share_code">
      <header class="share_header">关注葡萄之家,获取答案.</header>
      <img src="/images/4-4.png" height="212" class="code_img" alt="" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // vuex对象
    let store = useStore();
    // 路由对象
    let router = useRouter();
    //#region 计算分数
    // 分数
    let score = ref(0);
    // 正确答案
    let rightAnswer = reactive([2, 6, 10, 14, 18]);
    // 提交的答案
    let itemtj = computed(() => store.state.itemtj);
    // 计算分数方法
    function jSfs() {
      itemtj.value.forEach((item, index) => {
        if (item == rightAnswer[index]) {
          score.value += 20;
        }
      });
    }
    jSfs();
    //#endregion

    //#region 提示语
    let scoreTs = ref("");
    // console.log(scoreTs);
    let scoreTipsArr = reactive([
      "你说，是不是把知识都还给小学老师了？",
      "还不错，但还需要继续加油哦！",
      "不要嘚瑟还有进步的空间！",
      "智商离爆表只差一步了！",
      "你也太聪明啦，葡萄之家欢迎你！"
    ]);
    function tsYu() {
      if (score.value <= 20) {
        scoreTs.value = scoreTipsArr[0];
        return;
      }
      if (score.value <= 40) {
        scoreTs.value = scoreTipsArr[1];
        return;
      }
      if (score.value <= 60) {
        scoreTs.value = scoreTipsArr[2];
        return;
      }
      if (score.value <= 80) {
        scoreTs.value = scoreTipsArr[3];
        return;
      }
      if (score.value <= 100) {
        scoreTs.value = scoreTipsArr[4];
        return;
      }
    }
    tsYu();
    // console.log(scoreTs);
    //#endregion

    //#region 跳转到首页
    function zlYc() {
      router.push("/");
    };
    //#endregion

    return {
      score,
      scoreTs,
      zlYc
    };
  },
  // data() {
  //   return {
  //     score: 0,
  //     scoreTs: "",
  //     rightAnswer: [2, 6, 10, 14, 18], //正确答案
  //     scoreTipsArr: [
  //       "你说，是不是把知识都还给小学老师了？",
  //       "还不错，但还需要继续加油哦！",
  //       "不要嘚瑟还有进步的空间！",
  //       "智商离爆表只差一步了！",
  //       "你也太聪明啦，葡萄之家欢迎你！"
  //     ]
  //   };
  // },
  // computed: {
  //   ...mapState(["itemtj"])
  // },
  // created() {
  //   this.jSfs();
  //   this.tsYu();
  // },
  // methods: {
    // 计算分数
    // jSfs() {
    //   this.itemtj.forEach((item, index) => {
    //     if (item == this.rightAnswer[index]) {
    //       this.score += 20;
    //     }
    //   });
    // },
    // tsYu() {
    //   if (this.score <= 20) {
    //     this.scoreTs = this.scoreTipsArr[0];
    //     return;
    //   }
    //   if (this.score <= 40) {
    //     this.scoreTs = this.scoreTipsArr[1];
    //     return;
    //   }
    //   if (this.score <= 60) {
    //     this.scoreTs = this.scoreTipsArr[2];
    //     return;
    //   }
    //   if (this.score <= 80) {
    //     this.scoreTs = this.scoreTipsArr[3];
    //     return;
    //   }
    //   if (this.score <= 100) {
    //     this.scoreTs = this.scoreTipsArr[4];
    //     return;
    //   }
    // },
    // zlYc() {
    //   this.$router.push("/");
    // }
  // }
};
</script>

<style lang="scss" scoped>
.score_container {
  height: 100%;
  background-image: url("/images/4-1.jpg");
}
.your_scores_container {
  width: 9.7rem;
  height: 9.1rem;
  background: url("/images/4-2.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto 0;
  position: relative;
  .your_scores {
    position: absolute;
    width: 100%;
    text-indent: 3.3rem;
    top: 4.7rem;
    font-size: 1.4rem;
    font-weight: 900;
    -webkit-text-stroke: 0.05rem #412318;
    font-family: "Microsoft YaHei";
    .score_num {
      font-family: Tahoma, Helvetica, Arial;
      color: #a51d31;
    }
    .fenshu {
      color: #a51d31;
    }
  }
  .result_tip {
    position: absolute;
    top: 7rem;
    width: 9rem;
    left: 0.6rem;
    color: #3e2415;
    font-size: 0.65rem;
    text-align: center;
  }
}
.share_button {
  width: 6.025rem;
  height: 2.4rem;
  line-height: 2.4rem;
  margin: 0.8rem auto 0;
  text-align: center;
  font-size: 1rem;
  color: yellow;
  background-color: rgba(0, 0, 0, 0.5);
}
.share_code {
  width: 5.3rem;
  margin: 1.5rem auto 0;
  .share_header {
    color: #664718;
    font-size: 0.475rem;
    font-family: "Microsoft YaHei";
    width: 7rem;
    font-weight: 500;
  }
  .code_img {
    height: 5.3rem;
    width: 5.3rem;
    margin-top: 0.5rem;
  }
}
.share_cover {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background: url("/images/5-1.png") no-repeat;
  background-size: 100% 100%;
  opacity: 0.92;
}
.share_img {
  height: 10.975rem;
  width: 11.95rem;
  position: fixed;
  top: 0.5rem;
  left: 50%;
  margin-left: -5.975rem;
}
</style>

```
### 路由js文件
```js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home/index.vue";
const routes = [
  // 首页
  { path: "/", component: Home },
  // 答题页
  {
    path: "/item",
    component: () => import("../components/Item/index.vue")
  },
  // 打分页
  {
    path: "/score",
    component: () => import("../components/Score/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

```
### 数据共享js文件
```js
import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      // 周期
      zhqi: "第一周",
      // 题号
      itemHao: 1,
      // 提交答案
      itemtj: [],
      // 习题
      itemissue: []
    };
  },
  mutations: {
    // 初始化数据
    initData(state, res) {
      state.itemissue = res.data;
    },
    // 记录答题Id
    bcId(state, id) {
      state.itemtj.push(id);
    },
    // 题号++
    addTh(state) {
      state.itemHao++;
    },
    clearData(state) {
      state.itemtj = [];
      state.itemHao = 1;
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      let res = await axios.get("/data/question.json");
      // console.log(res);
      context.commit("initData", res);
    },
    // 提交答案
    addTijiao(context, id) {
      context.commit("bcId", id);
      if (context.state.itemHao < context.state.itemissue.length) {
        context.commit("addTh");
      }
      // console.log(context.state.itemtj);
    }
  },
  getters: {}
});

```