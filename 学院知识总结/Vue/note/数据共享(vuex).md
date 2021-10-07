# vuex的使用
## 概述
```text
Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的数据共享.
优点:
1.能够在vuex中集中管理共享的数据，便于开发和后期进行维护
2.能够高效的实现组件之间的数据共享，提高开发效率
3.存储在vuex中的数据是响应式的，当数据发生改变时，页面中的数据也会同步更新
```

## 基本使用
### vue3 Vuex4
1. 安装
```shell
npm install vuex@next --save
```
2. 配置:(在src文件夹下创建store文件夹并创建index.js)
```js
// 1.导入vuex
import { createStore } from "vuex";
// 2.导出并配置
export default createStore({
  state(){
      return {
      }
  },
  mutations: {},
  actions: {},
  getters: {}
});
```
3. 挂载(main.js)
```js
// 1.导入vue
import { createApp } from "vue";
// 2.导入根组件
import App from "./App.vue";
// 3.导入数据共享文件
import store from "./store";
// 4.创建vm实例
let vm = createApp(App);
// 挂载vuex数据共享
vm.use(store);
vm.mount("#app");
```
### vue2 vuex3
1. 安装
```shell
  yarn add vuex
```
2. 配置:(在src文件夹下创建store文件夹并创建index.js)
```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 创建 store

const store = new Vuex.Store({
    // 初始化数据
    state: {
        count: 0
    },
    // 同步函数处理
    mutations: {

    },
    // 异步函数处理
    actions: {

    },
    // 计算属性
    getters: {

    }
})

// 导出
export default store;
```
3. 挂载(main.js)
```js
import Vue from 'vue'
import App from './App.vue'
import store from "./store/index"

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
```

## vuex的核心
### state:唯一的公共数据源，所有共享的数据都要统一放到这里
1. 方式一
```js
import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            name: "张三",
        };
    },
});
```
```html
<template>
  <div class="hello">
    <h3 >我叫:{{ showSx }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    // 获取属性 this.$store.state.属性名
    showSx() {
      return this.$store.state.name;
    },
  },
};
</script>
```
2. 方式二(推荐)

```html
<template>
  <div class="hello">
    <h3>我叫{{ uname }},今年{{ age }}岁</h3>
  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  data(){
    return{
     
    }
  },
  methods:{

  },
  computed: {
    // 直接获取vuex的state中属性
    ...mapState(["uname", "age"]),
  }
};
</script>
```

### mutations:因不可以直接操作Store中的数据,所以用于修改Store中的数据(同步方法)
#### 不传参
```js
import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            name: "张三",
        };
    },
    mutations: {
        // 不传参
        bCcan(state) {
            state.name = "李四";
        },
    },
});
```
```html
<template>
  <div class="hello">
    <h3>我叫:{{ showSx }}</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    // 获取属性 this.$store.state.属性名
    showSx() {
      return this.$store.state.name;
    },
  },
  created() {
    // 不传参
    this.$store.commit("bCcan");
  },
};
</script>
```

#### 传参
1. 方式1
```js
import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            name: "张三",
            ahao: "打篮球",
        };
    },
    mutations: {
        // 不传参
        bCcan(state) {
            state.name = "李四";
        },
        // 传参
        cCan(state, val) {
            state.ahao = val;
        },
    },
});
```
```html
<template>
  <div class="hello">
    <h3 @click.prevent="aHao">{{ showSx }},我的爱好是{{ ahao }}</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      aihao: "踢足球"
    };
  },
  computed: {
    // 获取属性 this.$store.state.属性名
    showSx() {
      return this.$store.state.name;
    },
    ...mapState(["ahao"]),
  },
  created() {
    // 不传参
    this.$store.commit("bCcan");
  },
  methods: {
    // 传参同步函数通过commit触发
    aHao() {
      this.$store.commit("cCan", `${this.aihao}`);
    },
  }
};
</script>
```
2. 方式二
```js
// 导入vuex
import { createStore } from "vuex";

// 导出配置
export default createStore({
    state() {
        return {
            uname: "张三",
            age: 18,
        };
    },
    mutations: {
        changeName(state, name) {
            state.uname = name
        },
    },
});
```
```html
<template>
  <div class="hello">
    <h3 @click="changeName(name)">我叫{{ uname }},今年{{ age }}岁</h3>
  </div>
</template>

<script>
import { mapState,mapMutations} from "vuex";
export default {
  data(){
    return{
      name:'王五'
    }
  },
  methods:{
    // 直接获取vuex的mutations中的同步方法
   ...mapMutations(["changeName"]),
  },
  computed: {
    // 直接获取vuex的state中属性
    ...mapState(["uname", "age"]),
  }
};
</script>

```

### actions: 通过异步操作变更数据
1. 方式1
```js
import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            name: "张三",
            ahao: "打篮球",
            shouRu: 100,
        };
    },
    mutations: {
        // 不传参
        bCcan(state) {
            state.name = "李四";
        },
        // 传参
        cCan(state, val) {
            state.ahao = val;
        },
        // 异步调用
        sRu(state, val) {
            state.shouRu += val;
        },
    },
    actions: {
        // context固定参数
        asyncSru(context, val) {
            setInterval(function() {
                context.commit("sRu", val);
            }, 1000);
        }
    },
    getters: {
    }
});
```
```vue
<template>
  <div class="hello">
    <h3 @click.prevent="aHao">{{ showSx }},我的爱好是{{ ahao }}</h3>
    <button @click.prevent="mXi">查看收入明细</button>
    <p>{{ shouRu }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      aihao: "踢足球"
    };
  },
  computed: {
    // 获取属性 this.$store.state.属性名
    showSx() {
      return this.$store.state.name;
    },
    ...mapState(["ahao", "shouRu"]),
  },
  created() {
    // 不传参
    this.$store.commit("bCcan");
  },
  methods: {
    // 传参同步函数通过commit触发
    aHao() {
      this.$store.commit("cCan", `${this.aihao}`);
    },
    // 传参异步函数通过dispatch触发
    mXi() {
      this.$store.dispatch("asyncSru", 2);
    },
  }
};
</script>
```
2. 方式2
```js
// 导入vuex
import { createStore } from "vuex";

// 导出配置
export default createStore({
    state() {
        return {
            uname: "张三",
            age: 18,
            shouRu: 100
        };
    },
    mutations: {
        changeName(state, name) {
            state.uname = name
        },
        sRu(state, val) {
            state.shouRu += val
        },
    },
    actions: {
        asyncSru(context, val) {
            setInterval(function() {
                context.commit("sRu", val)
            }, 1000)
        }
    },
    getters: {
    }
});
```
```vue
<template>
  <div class="hello">
    <h3 @click="changeName(name)">我叫{{ uname }},今年{{ age }}岁</h3>
    <button @click="asyncSru(2)">查看收入明细</button>
    <P>{{shouRu}}</P>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions} from "vuex";
export default {
  data(){
    return{
      name:'王五'
    }
  },
  methods:{
    // 直接获取vuex的mutations中的同步方法
   ...mapMutations(["changeName"]),
   // 直接获取vuex的actions中的异步方法
   ...mapActions(["asyncSru"])
  },
  computed: {
    // 直接获取vuex的state中属性
    ...mapState(["uname", "age","shouRu"]),
  }
};
</script>
```

### getters:用于对Store中的数据进行加工处理形成新的数据,Store中数据发生变化，Getter的数据也会跟着变化
1. 方式1
```js
import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            name: "张三",
            ahao: "打篮球",
            shouRu: 100,
            age: 18
        };
    },
    mutations: {
        // 不传参
        bCcan(state) {
            state.name = "李四";
        },
        // 传参
        cCan(state, val) {
            state.ahao = val;
        },
        // 异步调用
        sRu(state, val) {
            state.shouRu += val;
        },
        // getters 的函数
        addAge(state) {
            state.age++
        }
    },
    actions: {
        asyncSru(context, val) {
            setInterval(function() {
                context.commit("sRu", val);
            }, 1000);
        }
    },
    getters: {
        xAge(state) {
            return state.age
        }
    }
});
```
```vue
<template>
  <div class="hello">
    <h3 @click.prevent="aHao">{{ showSx }},我的爱好是{{ ahao }}</h3>
    <button @click.prevent="mXi">查看收入明细</button>
    <p>{{ shouRu }}</p>
    <button @click="zAge">我长大了</button>
    <p>{{dAge}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      aihao: "踢足球"
    };
  },
  computed: {
    // 获取属性 this.$store.state.属性名
    showSx() {
      return this.$store.state.name;
    },
    ...mapState(["ahao", "shouRu"]),
    // 获取getters属性 this.$store.getters.属性名
    dAge() {
      return this.$store.getters.xAge;
    }
  },
  created() {
    // 不传参
    this.$store.commit("bCcan");
  },
  methods: {
    // 传参同步函数通过commit触发
    aHao() {
      this.$store.commit("cCan", `${this.aihao}`);
    },
    // 传参异步函数通过dispatch触发
    mXi() {
      this.$store.dispatch("asyncSru", 2);
    },
    // getters 用的方法
    zAge() {
      this.$store.commit("addAge");
    }
  }
};
</script>
```
2. 方式2
```js
// 导入vuex
import { createStore } from "vuex";

// 导出配置
export default createStore({
    state() {
        return {
            uname: "张三",
            age: 18,
            shouRu: 100
        };
    },
    mutations: {
        changeName(state, name) {
            state.uname = name
        },
        sRu(state, val) {
            state.shouRu += val
        },
        addAge(state) {
            state.age++
        }
    },
    actions: {
        asyncSru(context, val) {
            setInterval(function() {
                context.commit("sRu", val)
            }, 1000)
        }
    },
    getters: {
        zAge(state) {
            return state.age
        }
    }
});
```
```vue
<template>
  <div class="hello">
    <h3 @click="changeName(name)">我叫{{ uname }},今年{{ age }}岁</h3>
    <button @click="asyncSru(2)">查看收入明细</button>
    <P>{{shouRu}}</P>
    <button @click="addAge">点击我长大了</button>
    <p>{{zAge}}</p>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions,mapGetters} from "vuex";
export default {
  data(){
    return{
      name:'王五'
    }
  },
  methods:{
    // 直接获取vuex的mutations中的同步方法
   ...mapMutations(["changeName","addAge"]),
   // 直接获取vuex的actions中的异步方法
   ...mapActions(["asyncSru"])
  },
  computed: {
    // 直接获取vuex的state中属性
    ...mapState(["uname", "age","shouRu"]),
    // 处理后的数据 相当于计算属性                                                                                 
    ...mapGetters(["zAge"])
  }
};
</script>
```

### 模块化]
#### 基本应用
```js
const store  = new Vuex.Store({
  modules: {
    // 模块1
    user: {
       state: {
         token: '12345'
       }
    },
    // 模块2
    setting: {
      state: {
         name: 'Vuex实例'
      }
    },
  },
  // 和modules同级
  getters: {
      token: state => state.user.token,
      name: state => state.setting.name
  }
)
```
* 访问state属性: $store.**`state`**.**`模块名称`**.**`属性名`** 来获取
* ...mapGetters(['token', 'name'])

#### 开启命名空间
```js
const store  = new Vuex.Store({
  modules: {
    // 模块1
    user: {
      namespaced: true,
       state: {
         token: '12345'
       }
    },
    // 模块2
    setting: {
      namespaced: true,
      state: {
         name: 'Vuex实例'
      }
    },
  }
)
```
* 访问
1. this.$store.dispatch('模块名称/触发的方法') // 直接调用方法
2. 映射方式
```js
methods: {
       ...mapMutations(['user/updateToken']),
       test () {
           this['user/updateToken']()
       }
   }
  <button @click="test">修改token</button>
```
3. **createNamespacedHelpers**  创建基于某个命名空间辅助函数
```js
import {createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
<button @click="updateToken">修改token2</button>
```


## 相关链接
[vuex是个啥] (https://bigdata.bihell.com/language/javascript/vue/vuex.html#) 