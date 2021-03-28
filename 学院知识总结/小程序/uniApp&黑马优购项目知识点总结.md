# uniApp知识点

## 介绍

```txt
uni-app 是一个使用 Vue.js 开发所有前端应用的框架。开发者编写一套代码，可发布到 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
``` 
[百度] (https://uniapp.dcloud.io/)

## 使用 uniapp 开发小程序 需要配置网络请求

```js
// 封装uni的网络请求(https://www.npmjs.com/package/@escook/request-miniprogram)
// 1.导入包
import { $http } from '@escook/request-miniprogram'
// 2.把包挂载到uni这个顶级对象上
uni.$http = $http;
// 3.设置基准地址
$http.baseUrl = 'https://www.uinav.com';
// 4.设置请求拦截器(在请求之前 提示 数据正在加载中)
$http.beforeRequest = function (options) {
  // do somethimg...
	uni.showLoading({
	    title: '加载中...'
	});
}

// 5.设置响应拦截器(让提示消失)
$http.afterRequest = function () {
  setTimeout(function () {
      uni.hideLoading();
  }, 2000);
}
```
## 项目搭建（采用封包）
```txt
把 tabBar 相关的 4 个页面放到主包中，其它页面（例如：商品详情页、商品列表页）放到分包中。

在项目根目录中，创建分包的根目录，命名为 subpkg
在 pages.json 中，和 pages 节点平级的位置声明 subPackages 节点，用来定义分包相关的结构：
"subPackages":[
    {
      "root": "subpkg",
      "pages":  [ ]
    }
 ]
在 subpkg 目录上鼠标右键，点击 新建页面 选项，并填写页面的相关信息
```
## 项目中知识点的使用 (采用vue语法进行开发)

### 轮播图
```txt
  1. 结构  swiper > swiper-item
  2. 控制轮播图的属性
    autoplay 》自动播放
    indicator-dots 》指示器(小圆点)
    circular 》无缝衔接
```
### 两栏布局 滚动实现
```txt
  1. 结构  scroll-view 
  2. 滚动方向的属性 scroll-y(竖直滚动)
  3. 数组的形式添加类名 :class="['scroll-left-item', i == active ? 'active':'']"
  4. 获取视口的高度  uni.getSystemInfoSync().windowHeight
  5. 切换分类项  内容展示自动回到顶部
    5.1 定义初始值滚动条距离顶部的距离   scrollTop: 0
    5.2 <scroll-view class="right-scroll-view" scroll-y :scroll-top="scrollTop"></scroll-view>
    5.3 在定义好的切换方法中  // 让 scrollTop 的值在 0 与 1 之间切换   this.scrollTop = this.scrollTop === 0 ? 1 : 0
  
  6. 页面跳转的形式 
    uni.switchTab tabBar页面  uni.navigateTo 应用中的页面
```
### 组建的使用
```txt
  1. 组件的创建及使用
    1.1 在项目根目录的 components 目录上 创建组件 my-xxx 的形式
    1.2 页面中 直接使用  <my-xxx></my-xxx>
    1.3 组件中通过  props  来接收外部的值
        列：
        props: {
            // 背景颜色
        bgcolor: {
        type: String,
        default: '#C00000'
        }
      }

    2 组件中定义点击事件 @click 触发外界 绑定的 click 事件处理函数
      this.$emit('click')

    3 搜索组件吸顶效果 （样式实现）
      .search-box {
        // 设置定位效果为“吸顶”
        position: sticky;
        // 吸顶的“位置”
        top: 0;
        // 提高层级，防止被轮播图覆盖
        z-index: 999;
}
```
### 搜索实现
```txt
1.搜索历史记录持久化存储到本地
uni.setStorageSync('kw', JSON.stringify(数据))  JSON.parse(uni.getStorageSync('kw') || '[]')
```
[实现方式]{https://www.escook.cn/docs-uni-shop/mds/5.search.html#_5-1-1-%E8%87%AA%E5%AE%9A%E4%B9%89-my-search-%E7%BB%84%E4%BB%B6}

### 上拉加载和下拉刷新
```txt
  上拉：json相关页面配置 "onReachBottomDistance": 150 
        触底的事件 onReachBottom 当前页面加一 重新请求数据
        新旧数据拼接
        定义请求数据状态 未请求 isloading: false 
        请求数据的方法中 先开启  请求结束 关闭  接着在onReachBottom中判断请求状态 true 直接return下面代码不在执行
        判断是否还有下一页数据 pagenum * pagesize >= total

  下拉：son相关页面配置 "enablePullDownRefresh": true,	"backgroundColor": "#F8F8F8",
        下拉刷新事件 onPullDownRefresh 将相关数据重置
        并通过传参的形式 this.getGoodsList(() => uni.stopPullDownRefresh()) 重新发起请求
        请求方法中 getGoodsList(cb) { // 在关闭节流下面 判断 cb && cb();}
```
```vue 
<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键字
					query: "",
					// 商品分类id
					cid: "",
					// 页码值
					pagenum: 1,
					// 每页显示的条数
					pagesize: 10
				},
				// 商品列表数据
				goodsList: [],
				// 数据总量
				total: 0,
				// 2.3 请求数据状态 未请求
				isloading: false
			};
		},
		onLoad(options) {
			// 1.1获取相关页面传来的参数
			this.queryObj.cid = options.cid || "";
			this.queryObj.query = options.query || "";

      // 获取首屏数据
			this.getGoodsList();
		},
		// 2. 上拉加载
		onReachBottom() {
			// 2.7 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$toast('我也是有底线的');
			// 2.6 判断请求状态
			if (this.isloading) return;

			// 2.1重新获取数据 让当前页面 +1
			this.queryObj.pagenum += 1;
			this.getGoodsList();
		},
		// 3.下拉刷新
		onPullDownRefresh() {
			// 3.1 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []

			// 3.2 重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
			// 1.2请求获取数据
			async getGoodsList(cb) {
				// 2.4 开启节流阀
				this.isloading = true;
				const {
					data: res
				} = await uni.$http.get("goods/search", this.queryObj);
				// console.log(res);
				// 2.5 关闭节流阀
				this.isloading = false;
				// 3.3只要数据请求完毕，就立即按需调用 cb 回调函数
				cb && cb();

				if (res.meta.status !== 200) return uni.$toast();

				// 2.2 新旧数据拼接
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total;
			},
			// 1.3跳转到商品详情页面
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

```



