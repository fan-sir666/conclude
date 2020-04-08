# jQuery知识点

## 选择器

### 基本

### 层级

### 筛选

### 内容

### 可见性

### 属性

### 子元素

### 表单

### 表单对象属性
## DOM和jQuery的转换

```js
    // 把原生DOM对象转换成jQuery对象  语法：$(原生DOM对象放在这里)

    // 把jQuery对象转换成原生DOM对象
    // 语法：方式①$('选择器')[索引]     方式②$('选择器').get(索引)
```
## 获取和设置标签内容

```js
text() -- > innerText
html(); -- > innerHTMl
```
## 获取和设置表单的value

```js
元素.val()
```
## 操作类名

```js
    // 添加类名 Node.classList.add()-- > addClass();
    // 移除类名 Node.classList.remove()-- > removeClass();
    // 切换类名 Node.classList.toggle()-- > toggleClass();
    // 判断是否有某个类名 Node.classList.contain()-- > hasClass();

    // $('div').addClass('active');

    // $('div').removeClass('acc');

    // $('div').toggleClass('active');

    // let flag = $('div').hasClass('active');
```
## 操作属性

```js
// 标签
// 增： 元素.attr(属性名,属性值)
// 删： 元素.removeAttr(属性名)
// 查： 元素.attr(属性名)

// 表单
// 获取/设置属性 prop()
// 移除属性 removeProp()
```
## 操作CSS样式

```js
// 获取 元素.css(属性名)
$("p").css("color");

// 设置 元素.css({属性名：属性值})
$("p").css("color","red");
$("p").css({ "color": "#ff0011", "background": "blue" });
```
## 操作元素

### 创建

```js
    // 方法1: $('html标签')
    // 方法2: $('元素').html('html标签')
```
### 删除

```js
元素.remove()
父元素.empty()
```
### 插入

```js
// 插入到末尾
父元素.append(子元素)
子元素.appendTo(父元素)
// 插入到前面
父元素.prepend(子元素)
子元素.prependTo(父元素)
// 插入到 XX 的后面
参照物.after(插入的东西)
(插入的东西).insertAfter(参照物)
// 插入到 XX 的前面
参照物.before(插入的东西)
(插入的东西).insertBefore(参照物)
```
### 替换

```js
// 元素.replaceWith(替换元素)
$('b').replaceWith('<a href="http://www.baidu.com">百度</a>')
```
### 复制

```js
// 元素.clone(true) // 深拷贝
```
### 查找

```js
// children() 获取某个元素的所有子元素
// 元素.find(后代元素选择器)    $("div").children(".selected") 这样和find一样
// parent() 某个元素的父元素    parents() 某个元素的祖元素
// prev() 上一个  prevAll() 上所有
// next() 下一个  nextAll() 下所有
// siblings()   某个元素的其他兄弟元素
```
