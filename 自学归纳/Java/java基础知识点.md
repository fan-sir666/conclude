# 基础知识点总结

## java是什么
```txt
Java通过面向对象的编程语言。它不仅吸收了C++语言的优点，而且摒弃了C++中难于理解的多继承和指针的概念。具有简单性、功能强大、分布式、健壮性、安全性、平台独立与可移植性、多线程及动态性的特点。

Java语言作为静态面向对象的编程语言的代表，可以充分的实现面向对象的理论，并允许程序员以一种优雅的思维方式编程复杂的程序。可以编写桌面应用程序、Web应用程序、分布式系统和嵌入式系统应用程序。
```
## JDK、JRE(Java运行环境)、JVM(Java虚拟机)的关系
```txt
JDK:为Java应用程序提供了基本的开发和运行环境，是整个Java的核心，包括：
1.Java运行环境（JRE）
2.JDK类库，如：java.lang、java.io、java.awt、java.swing等类
3.Java开发工具，如：javac.exe（编译工具）、java.exe（运行工具）、javadoc.exe（生成JavaDoc文档的工具）和jar.exe（打包工具）等.

JRE:是Java程序的运行环境，包含：JVM和Java核心类库

JVM:JVM即Java虚拟机，是整个Java实现跨平台的最核心的部分，是编译后的Java程序（.class文件）和硬件系统的接口，不仅解释执行编译后的Java指令，而且还进行安全检查

三者关系: 包含关系  JDK  > JRE + 其他  >  JVM + 其他
```
![图片](./img/1.png)

## IDEA的快捷键使用

```txt
Ctrl+/ 或 Ctrl+Shift+/  注释

Ctrl+N   查找类

Ctrl+Alt+L  格式化代码

Ctrl+R 替换文本

Ctrl+F 查找文本

Ctrl+Shift+上下键   上下移动代码

Ctrl+X 删除行

Ctrl+D 复制行
```
## 命名规范

```txt
java类的命名(大驼峰):类的名字必须由大写字母开头而单词中的其他字母均为小写；如果类名称由多个单词组成，则每个单词的首字母均应为大写例如TestPage。

变量全部小写;常量名全大写用下划线分割

方法的命名(小驼峰):第一个单词应以小写字母作为开头，后面的单词则用大写字母开头 。例如： sendMessge
```

## 变量

### 定义
```java
//        声明变量并赋值  整数
       int num1 = 10;

//               输出
        System.out.println(num1);


//       先声明  再赋值
        int num2;
        num2 = 20;
        num2 = 30;

//       输出 30
        System.out.println(num2);


//         一次定义多个变量
        
//        方式一
        int num1,num2,num3;
        num1 = 10;
        num2 = 20;
        num3 = 30;

        System.out.println(num1);
        System.out.println(num2);
        System.out.println(num3);
//        方式二
        int num4 = 10,num5 = 20,num6 = 30;
        System.out.println(num4);
        System.out.println(num5);
        System.out.println(num6);
```
### 变量类型

![图片](./img/3.png)

#### 整数

![图片](./img/2.png)

#### 小数
![图片](./img/4.png)

#### 字符 和  字符串
![图片](./img/5.png)
![图片](./img/6.png)

#### 布尔

![图片](./img/4.png)

```java
//      单字符

        char z1 = '曾';
        int z2 = '曾';
        System.out.println(z1);
        System.out.println(z2);
//        注意  只能保存单字符   不能为空

//       字符串

        String s1 = "来了老弟,哈哈哈!!!";
        System.out.println(s1);

//        字符串拼接

        char c1 = '爱';
        String jg = "范志伟"+c1+"曹喜娟";
        System.out.println(jg);

//        布尔类型  boolean   1 真 true      0 假 false  (1字节)

        boolean f1 = false;
        System.out.println(f1);
        boolean f2 = true;
        System.out.println(f2);

```
### 变量的作用范围(理解为 声明好的变量 可以由内往外找 不可以由外往里找)
```java
//        1、以下代码能否正常执行？若能正常执行，效果是什么？  20
        int num = 10;
        {
            num = 20;
        }
        System.out.println(num);

//        2、以下代码能否正常执行？若能正常执行，效果是什么？10
        {
            int num = 10;
            System.out.println(num);
        }

//        3、以下代码能否正常执行？若能正常执行，效果是什么？ 报错
        int num1 = 10;
        {
            int num2 = 20;
            System.out.println(num1);
        }
        System.out.println(num2);


//        4、以下代码能否正常执行？若能正常执行，效果是什么？ 报错
        int num1 = 10;
        {
            int num2 = 20;
        }
        System.out.println(num1 + num2);


//        5、以下代码能否正常执行？若能正常执行，效果是什么？ 30
        int num1 = 10;
        {
            int num2 = 20;
            num1 = num2 + num1;
        }
        System.out.println(num1);

//        6、以下代码能否正常执行？若能正常执行，效果是什么？ 报错
        int num1 = 5;
        {
            int num2 = 8;
        }
        System.out.println("幸运数字：" + num1 + num2);
```
## 常量
```java
    /*
        *  常量 ：数据一旦存储  不可修改  可进行运算(从左向右  依次执行)
        *
        *  命名建议全部大写字母
        *
        *   final + 数据类型 + 变量名称
        *
        * */
    final int NUM = 999;
    System.out.println(NUM*2);

    //        int a,b,c=10;
    //        final String N = c+10+"";
    //        System.out.println(N+c); // 2010
```
## 运算符{算数运算符、赋值运算符、关系运算符、逻辑运算符、三元运算符}

### 算数运算符（四则运算 取模（必须是数字类型） 字符串的拼接）
![图片](./img/8.png)
![图片](./img/9.png)

```java
// 自增、自减算术运算符
// ++ 前置  先运算后赋值

// 解析:  a 的初始值为10 ++a = 11 此时a变为11 ，然后 a++ 先赋值 所以a++ = 11 相加 a = 22 
//        int a = 10;
//        a = ++a + a++; // 11 + 11
//        System.out.println(a); // 22

// 解析: a的初始值 10 ++a 先运算，所以 ++a = 11; 此时 a=11 然后a-- 先赋值 a-- = 11 所以 结果为0
//        int a = 10;
//        a = ++a - a--; // 11 - 11
//        System.out.println(a); // 0

// 解析: a的初始值 10 a++ 10 此时的a为11  --a先运算 --a = 10 所以 10-10 = 0
//        int a = 10;
//        a = a++ - --a; // 10 - 10
//        System.out.println(a); // 0


/*
* 解析: a 的初始值 10   11  21
*     a++ = 10  --a = 10 结果 a = 20 再次输出 a++ = 20
* */
//        int a = 10;
//        a = a++ + --a; // 10 + 10
//        System.out.println(a++); // 20
//        System.out.println(a); // 21

 /*
  * 解析: a的初始值: 10  11 10 11
  *       b的初始值: a++ = 10 所以b值为 10  11 12
  *  b++ 先赋值 a 由11 又变为类 10
  *  最后 a = 10 b = 10
  * 输出 a++ = 10 ++b = 12 结果 22 
  * a = 11 b = 12
  * */
//        int a = 10;
//        int b = a++; // 10
//        a = b++; // 10
//        System.out.println(a++ + ++b); // 10 + 12 22
//        System.out.println(a); // 11
//        System.out.println(b); // 12
```




