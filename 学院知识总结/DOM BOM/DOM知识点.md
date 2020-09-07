# DOM 知识点总结

## webApi介绍

```text
WebAPI: 其他开发者(浏览器厂商 其他开发者)预先定义好的一组 操作网页的(DOM)和 操作浏览器的(BOM) 方法
```
## DOM

```text
DOM(document object model) 文档对象模型 主要的作用: 改变网页的内容 样式 结构

DOM树: 就是根据网页来进行抽象出来的一种树状结构
文档: document  一个页面就是一个文档
元素: element <标签>内容</标签> 任何一个标签都是一个元素
节点: node
      标签节点(一个标签就是一个节点 <p></p>)
      文本节点(标签里面的内容就是文本节点 <p>1111</p>这里的1111就是文本节点)
      属性节点(<p title="aaa"></p> title="aaa"这就是属性节点)
      注释
```
## 元素获取

```js
 console.log() // 大家看到的标签其实是一个对象 (对象是有方法和属性的)
 console.dir(oDiv); // 打印对象详细信息的

 ①document.getElementById('id名') // 返回值: 元素对象 参数: id名 兼容性: 没任何兼容性
 ②节点.getElementsByTagName('标签名') // 返回值: 元素对象集合(伪数组) 参数: 标签名 兼容性: 没任何兼容性
 // 注意: 节点可以是任何元素 也可以是document
 ③document.getElementsByClassName('类名'); // 返回值: 元素对象集合(伪数组) 参数: 类名名 兼容性: IE7 、8不兼容
 // 解决方法
function getElementsByClassName(node, className) {
    if (node.getElementsByClassName) {
        // 使用现有方法
        return node.getElementsByClassName(className);
    } else {
        // 循环遍历所有标签，返回带有相应类名的元素
        var results = [],
            elems = node.getElementsByTagName("*");
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i].className.indexOf(className) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
 ④document.querySelector('css选择器') // 返回值: 元素对象 参数: 符合css选择器的 (#id名  .class名  标签名) 兼容性: IE 8以下
// 注意点: 如果符合css选择器规则的元素有多个 只获取第一个
 ⑤document.querySelectorAll(); // 返回值: 元素对象集合(伪数组) 参数: 符合css选择器的 (#id名  .class名  标签名) 兼容性: IE 8以下

 // 解决方法
if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
            element = document._qsa.shift();
            element.style.removeAttribute('x-qsa');
            elements.push(element);
        }
        document._qsa = null;
        return elements;
    };
}

if (!document.querySelector) {
    document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
    };
}

// 用于在IE6和IE7浏览器中，支持Element.querySelectorAll方法
var qsaWorker = (function () {
    var idAllocator = 10000;

    function qsaWorkerShim(element, selector) {
        var needsID = element.id === "";
        if (needsID) {
            ++idAllocator;
            element.id = "__qsa" + idAllocator;
        }
        try {
            return document.querySelectorAll("#" + element.id + " " + selector);
        }
        finally {
            if (needsID) {
                element.id = "";
            }
        }
    }

    function qsaWorkerWrap(element, selector) {
        return element.querySelectorAll(selector);
    }

    // Return the one this browser wants to use
    return document.createElement('div').querySelectorAll ? qsaWorkerWrap : qsaWorkerShim;
})();
```
<font color=#FFD700 size=6 face="STCAIYUN">特殊获取html 和 body</font>

```js
document.body // 获取body元素
document.documentElement // 获取html标签
```
## 事件基础

### 事件语法

```js
 事件三要素:
    1. 事件源: 事件发生在谁身上
    2. 事件类型: 浏览器给我们规定好的一些事件类型 click(点击) moseover(鼠标移入)
    3. 事件处理程序: 当事件在事件源发生的时候 要干啥

 事件的执行步骤:
    1.获取事件源
    2.绑定事件
    3.书写事件处理程序

    // 语法：
    let 元素 = 获取元素的方法
    元素.on+事件类型 = function (){
        // 让程序做啥 写在这里
    }
```
### 常见的事件类型

```js
// 鼠标事件
 ① onclick 鼠标点击左键触发 ondblclick 双击
 ② onmouseover 鼠标移入触发
 ③ onmouseout 鼠标移出触发
 ④ onmousemove 鼠标移动触发
 ⑤ onmouseup 鼠标弹起触发
 ⑥ onmousedown 鼠标按下触发
// 键盘事件
 ①keydown 按下
 ②keyup 抬起
 ③keypress 敲减 // 不能识别ctrl shift 左右箭头的
// 其他
 onblur 失去鼠标焦点触发
 onfocus 获得鼠标焦点触发
 oninput 只要输入就会触发
```
## 操作元素

### 操作元素内容

```js
    元素.innerHtml  // 可以解析标签
    元素.innerText
    // 清空元素内容
    元素.innerHTML = null 或 元素.innerText = null
```

### 操作元素的常见属性

```js
// 常见的元素属性
title ,id ,src ,alt ,href ,style
元素.属性名= '值' ;
元素.style.样式的名字 = 值; // 该样式为行内样式
```

### 操作元素的类名

```js
// 语法：元素.classList.方法名()
// 方法名 (add 添加; remove 移除 ; toggle 切换 ; contains 判断类名是否存在 ) 添加方式2:元素.className = '值'
```
### 操作表单的常用属性

```js
value属性: 语法: 元素.value = "值";
type属性:  语法: 元素.type = "值" (值必须是html规定的);
checked属性: 语法: 元素.checked = boolean true代表选中;
disabled属性: 语法: 元素.disabled = boolean true代表禁用;
selected属性:  语法: 元素.selected = boolean true代表选中;
```
### 操作自定义属性

```js
添加/修改：元素.setAttribute('属性名','值');
删除: 元素.removeAttribute('属性名');
获取：元素.getAttribute('属性名')
// H5 的方式
添加/修改：元素.dataset.属性名 = '值';
删除: delete 元素.dataset.属性名;
获取: 元素.dataset.属性名  或 元素.dataset['属性名']
```
## 节点操作

### 节点的概念

```js
节点: 在网页中(除了<!DOCTYPE html>)任何内容都是节点.
// 包含：
        1.元素节点 其实就是标签
        2.属性节点 其实就是标签中的属性
        3.文本节点 其实就是文本
        4.注释节点 其实就是注释
// 属性：
        1.文本节点  节点类型: 3  节点名称: #text  节点的值: 文本的内容
        2.(记住)标签节点  节点类型: 1  节点名称: 标签的名字 节点的值: null
        3.注释节点  节点类型: 8  节点名称:  #comment 节点的值: 注释内容
```
### 节点的创建

```js
    /* // 包括创建和插入节点
    方法1：元素.innerHTML  // 可以在任何元素中添加节点,插入节点会把元素的内容清空
    方法2：document.write() // 只能在body中插入元素,会把body的内容清空 */

    方法3：document.createElement('标签名') // 注意: 只能创建元素 不能插入元素
```
### 节点的插入

```js
1. 父元素.appendChild() 
    // 功能: 把元素插入到父元素内部的最后
    // 参数: 新创建的元素对象(节点)
    // 返回值: 添加进去的元素
2. 父元素.insertBefore(newChild,refChild)
    // 功能: 把元素插入到父元素内部的某个元素的前面
    // 参数: 要插入的新元素,基准元素
    // 返回值: 插入失败false 成功的返回那个元素
```
### 节点的删除

```js
    父元素.removeChild(子节点) //  返回: 被删除掉的那个元素对象
```
### 节点的替换

```js
    父元素.replaceChild(新元素,旧元素);
```
### 节点的复制

```js
    自身元素.cloneNode() // true代表深拷贝 false代表浅拷贝（false默认值）
```
### 节点的查找

```js
// 查找父节点:
    1. 子元素.parentNode   // (推荐)
    2. 子元素.parentElement

// 查找子节点:

    // 所有 
    1. 父元素.children    // (推荐) 获取元素节点
    2. 父元素.childNodes  // 获取元素的所有节点

    // 第一个子节点
    1. 父元素.firstElementChild 或 元素.children[0] // 获取元素节点 (推荐)
    2. 父元素.firstChild          // 获取所有节点

    // 最后一个子节点
    1. 父元素.lastElementChild 或 元素.children[元素.children.length-1] // 获取元素节点 (推荐)
    2. 父元素.lastChild          // 获取所有节点

// 兄弟节点
    上: 当前元素.previousElementSibling  // 推荐 
        当前元素.previouSibing

    下: 当前元素.nextElementSibling     //  推荐
        当前元素.nextSibling;
```
```text
    总结: 只有查找使用 属性  且 兄弟是当前元素 父子 为相反的元素.属性
          操作各种方法时 只有复制是 当前元素.方法名(节点) 其他全是父元素做基础!!!  
```
## 事件的监听

### 绑定事件 | 解绑事件

```js
// 绑定
1.  语法: 事件源.on+事件类型 = function (){}  // 注意: 只能给元素添加不同的事件 如果是相同的事件那么会被覆盖
2.  语法: 事件源.addEventListener(事件类型, 事件处理程序, 是否冒泡[可选的]) // 如果不写 为false(冒泡) 如果写true true代表捕获
3.  语法: 事件源.attachEvent('on+事件类型', 事件处理程序);
// 解绑
1.  语法: 事件源.on+事件类型 = null;
2.  语法: 事件源.removeEventListener(事件类型,事件处理函数(名字))
3.  语法: 事件源.detachEvent('on+事件类型', 事件处理程序(名字));  

// 列子
<body>
    <button id="btn">按钮</button>
    <script>
        // let btn = document.querySelector('button');
        // btn.addEventListener('click', fn);

        // function fn() {
        //     alert('来了老弟');
        //     btn.removeEventListener('click', fn);
        // }

        // var btn = document.getElementById('btn');
        // btn.attachEvent('onclick', fn);

        // function fn() {
        //     alert('来了老弟');
        //     btn.detachEvent('onclick', fn);
        // }
    </script>
</body>

```
## 事件流

```js
事件流: 就是描述从页面中接收事件的顺序,事件的发生是有顺序的，这个就是DOM事件流

事件流的三个阶段: 捕获阶段 目标阶段 冒泡阶段  (由外往里 捕获；由里往外 冒泡)
// 注意：事件没有冒泡 onblur onfocus onmouseenter onmouseleave  , xxx.onclick 和attachEvent只有冒泡没有捕获;
//       在js执行过程中，只能执行冒泡或者捕获的其中一个
```
## 事件对象

```js
概念: 在事件触发后，在事件处理程序中，所获取并操作的对象，用这个对象代表事件的状态

语法: 
    事件源.on+事件类型 = function (e) { // 第一个形参e就是事件对象 不需要你创建，这是事件中js自动给我弄好的 }
    事件源.addEventListener('事件类型', function(e){})

// 列子
<body>
    <button id="btn">按钮</button>
    <script>
        // let btn = document.querySelector('button');
        // btn.addEventListener('click', fn)

        // function fn(e) {
        //     console.log(e);
        // }

        var btn = document.getElementById('btn');
        btn.attachEvent('onclick', fn)

        function fn() {
            var e = e || window.event;
            console.log(e);
        }
    </script>
</body>
```
## 事件对象的常用属性

```js
e.target 返回触发事件的对象

e.type 事件类型

e.stopPropagation() 阻止冒泡的 

e.preventDefault(); | <a href="javascript:;"></> // 阻止浏览器默认行为   
```
### 鼠标事件(mouseEvent)对象的属性

```js
1.client系列 -- 在可视区内获取鼠标的位置
    1.1 clientX 鼠标相距离 可视区的是水平坐标
    1.2 clientY 鼠标相距离 可视区的是竖直坐标
2.page系列  -- 在页面内获取鼠标的位置
    2.1 pageX 在页面内获取鼠标的位置的水平坐标
    2.2 pageY 在页面内获取鼠标的位置的竖直坐标
3.screen系列 -- 获取电脑屏幕中鼠标的位置
    3.1 screenX
    3.2 screenY
// 列子
    document.onclick = function(e) {
        console.log(`水平：${e.clientX} ; 垂直：${e.clientY}`);
    }
    document.onclick = function(e) {
        console.log(`水平：${e.pageX} ; 垂直：${e.pageX}`);
    }
```
### 键盘事件的keyCode

```js
 e.keyCode  //  键盘上的键都有一个唯一的键码(ASCII码) 大写 65~90 小写 97~122

 // charCodeAt() 英文转数字   string.fromcharCode  数字转字母
```
## 事件委托

```js
// 概念: 把子孙元素的事件注册，完全交给子孙元素的夫级元素代理   注意: 子元素元素能把事件委托给上级 但是上级不能把事件委托给下级

// 原理：事件冒泡
1.找到子孙元素的上级 并且给上级注册事件
2.在事件处理程序中，通过e.target找到触发事件的元素
3.通过事件对象的nodeName判断是不是你想要的那个元素
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <span>哈哈哈</span>
    </ul>
    <script>
        let oul = document.querySelector('ul');
        oul.onclick = function(e) {
            if (e.target.nodeName == "LI") {
                console.log(e.target.innerText);
            }
        }
    </script>
</body>
```
## 获取距离的方式

```js
// offset系列
offsetWidth: 某一个元素的尺寸 宽度+padding+border  不包括margin 不带单位;
offsetHeight: 某一个元素的高度 高度+padding+border 不包括margin 不带单位;
offsetLeft: 找到自身相对于定位父级的left值;
offsetTop:找到自身相对于定位父级的top值;
offsetParent: 获取自己的定位父级;
 /* 注意: 1.元素自身如果有fixed属性， offsetParent的值null
        2.body元素的offsetParent为null
        3.如果最近的父级没有定位 那么offsetParent往上找, 找到就返回该父元素，找不到返回body */

// scroll系列
scrollHeight: 获取指定标签内内容的真实高度;
scrollTop: 被卷去的高度  卷曲;

// client系列
clientWidth: 获取的是元素不包括边框的宽度;
clientHeight: 获取的是元素不包括边框的高度;
clientLeft: 左边框的宽度
clientTop: 上边框的宽度
```
