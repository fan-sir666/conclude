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

![图片](./img/7.png)

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
## 运算符（算数运算符、赋值运算符、关系运算符、逻辑运算符、三元运算符）

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
### 赋值运算符（先将右侧进行运算，然后将式子  改写成  = 号的形式 , 最后将结果输出）

![图片](./img/10.png)

```java
//        int a = 10;
//        int b = 20;
//        a = 10 * 2;
//        b *= 1 + 1;


//        int a = 2;
//        int b = 3;
//        a *= a + b;
//        b *= b + 1;

//
//        byte b = 3;
//        b *= b + 2;


//        System.out.println(a); // 20   10
//        System.out.println(b); // 40   12   15
```
### 关系运算符

![图片](./img/11.png)

```java
/*        int a = 10;
        int b = 20;
        System.out.println(a == b);// false
        System.out.println(a >= b);// false
        System.out.println(a <= b);// true
        System.out.println(a != b);// true*/

        /*
         *   a  11 12 13
         *
         *   b   12 13 14
         * */
       /* int a = 10;
        int b = 11;
        System.out.println(a++ == ++b); // false
        System.out.println(++a >= b++); // true
        System.out.println(a++ != ++b); // true
        System.out.println(a); // 13
        System.out.println(b); // 14*/


       /* int a = 3;
        int b = 4;
        System.out.println( a=b ); // 4
        System.out.println( a==b );// true
*/


/*        int a = 10;
        int b = 20;
        boolean c = (a + 10) > b; // false
        boolean d = (a + b) > b; // true
        boolean e = (a + b) >= (b + a); // true
        System.out.println(c);
        System.out.println(d);
        System.out.println(e);*/



/*        int a = 2;
        int b = 3;
        boolean x = (a+2) == (b++); // false
        boolean y = (a+2) == b; // true
        System.out.println(x);
        System.out.println(y);
        System.out.println(b); // 4*/


/*        int a = 2;
        int b = 3;
        boolean x = (a+2) == (++b); // true
        boolean y = (a+2) == b; // true
        System.out.println(x);
        System.out.println(y);
        System.out.println(b); // 4*/
```
### 逻辑运算符

![图片](./img/12.png)

```java
        /*
         *   逻辑运算符      &       |        ！                ^（异或）                  &&  （短路与）         ||（短路或）
         *
         *             一假则假   一真则真    取反      两端值相同false,不相同true     式子出了结果：后面不执行
         *
         * */

        /*int a = 10;
        int b = 20;
        boolean c = (a > 10) && (b >= 20);
        System.out.println(c); // false*/


/*        int a = 10;
        int b = 20;
        a += 5; // 15
        b -= 10; // 10
        boolean c = (a > 10) && (b >= 20);
        System.out.println(a); // 15
        System.out.println(b);  // 10
        System.out.println(c);  // false*/


       /* int a = 10;
        int b = 20;
        a += 5;  // 15
        b -= 10;    // 10
        boolean c = (a > 10) || (b >= 20);
        System.out.println(a); // 15
        System.out.println(b);  // 10
        System.out.println(c);  // true*/


       /* int a = 10;  // 11 12   13
        int b = 11;  // 12  11  13
        System.out.println( a++==10 && ++b>=11); // true
        System.out.println( ++a==b-- || b++>=a-- || ++a>13 || b--<12 || (b=13)>(a=12)); // true
        System.out.println( a++==++b && (b=13)!=a && (a=13)!=b); // false
        System.out.println(a); // 13
        System.out.println(b); // 13*/


      /*  int a = 1;  // 2
        int b = 1;  // 2
        boolean c = (a++ + ++b > 5) && (b >= a) && (b++ == a);
        System.out.println(a);
        System.out.println(b);
        System.out.println(c); // false*/



/*        int a = 1;  // 2    3
        int b = 1;  // 2 3  4

//      先算 && 再算 ||
//                                       1      2 true   2      2 true
//                    2      3    false          true 这里决定结果
        boolean c = (a++ + ++b > 5) || (b++ <= ++a) && (b++ == a);
        System.out.println(a); // 3
        System.out.println(b); // 4
        System.out.println(c); // true*/
```
### 三元运算符

![图片](./img/13.png)

```java
//        int a = 10;
//        int b = 20;
//        int c = 30;
//        //定义一个临时的变量 用来保存两个数中的较大值
//        int tmp = a > b ? a : b;
//        //利用上一步的较大值跟第三个数比较，确定这三个数中的最大值
//        int max = c > tmp ? c : tmp;
//        //打印结果
//        int max = c > (a>b?a:b) ? c : (a>b?a:b);
//        System.out.println(max); // 30
```
## 流程控制语句

![图片](./img/14.png)

### 判断
```java
/*
        *  流程语句：if
        *    判断条件进行时，要先小范围再大范围
        *    格式:
        *      单条件： if(判断条件){代码块}
        *      二选一:  if(判断条件){代码块} else {代码块}
        *      多条件:  if(判断条件){代码块} else if(判断条件){代码块} else {代码块}
        * */

//        int age = 20;
//        if (age >= 18) {
//            System.out.println("成年人：今年"+age+"岁");
//        }


//        String name = "范志伟";
//        int sex = 1;
//        if (sex == 0) {
//            System.out.println("欢迎"+name+"女士");
//        }else {
//            System.out.println("欢迎"+name+"先生");
//        }

//        int num = 10;
//        switch (num){
//            case 1:
//            case 2:
//            case 3:
//            case 4:
//            case 5:
//                System.out.println("今天是工作日");
//                break;
//            case 6:
//            case 7:
//                System.out.println("今天是休息日");
//                break;
//                default:
//                    System.out.println("输入数字超出范围1~7");
//        }

//        int score = 59;
//        if (score >= 80) {
//            System.out.println("成绩优秀");
//        }else if (score >= 60 && score < 79) {
//            System.out.println("成绩及格");
//        }else {
//            System.out.println("需要再次补考");
//        }
```
### 循环
```java
/*
        * 循环语句 for
        *
        *      语法: for (初始值; 循环条件; 步进) { 循环体 }
        *      注意: 循环内定义的变量  每次都会重新赋值  变量不会发生改变
        *
        * 循环语句 while
        *
        *  语法:
        *       循环初始值
        *       while (循环条件){ 循环代码  步进}
        *
        *
        * */

       /* for (int i = 1; i <=100 ; i++) {
            if (i%3==0){
                System.out.println(i);
            }
        }*/


       /* int i = 1;
        while (i<=100){

            if (i %3 == 0) System.out.println(i);

            i++;
        }*/

/*//     倒叙打印
        for (int i = 100; i >= 1 ; i--) {
            System.out.println(i);
        }*/

/*//      无限循环  判断条件总是满足
//        for (;true;) {
//            System.out.println("无线循环");
//        }
//        while (true){
//            System.out.println("无线循环");
//        }*/


/*//      循环嵌套
        for (int i = 0; i < 3 ; i++) {
            for (int j = 0; j < 5; j++) {
                System.out.print("*");
            }
            System.out.println(" ");
        }*/


// 练习题
//        思考案例1：要求，每次展示一个*，用for展示如下效果 （不能用if）
//	*
//	**
//	***
//	****

//        for (int i = 0; i < 4; i++) {
//            for (int j = 0; j <= i ; j++) {
//                System.out.print("*");
//            }
//            System.out.println(" ");
//        }

//      思考案例2：要求，每次展示一个*，用for展示如下效果 （不能用if）
//	****
//	***
//	**
//	*

//        for (int i = 0; i < 4; i++) {
//            for (int j = 4; j > i ; j--) {
//                System.out.print("*");
//            }
//            System.out.println(" ");
//        }

// 九九乘法表

        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print( j + "*" + i + "=" + i * j+"\t");
            }
            System.out.println("\n");

        }
    }
```
### 关键字

```java
 /*
         *  关键字
         *       break: 结束当前循环  放在循环体内
         *
         *       continue: 跳出本次循环
         *
         * */
  /*      int c = 1;
        for (int i = 1; i <= 100; i++) {
            if (c>3){
                break;
            }
            if (i % 17 == 0) {
                System.out.println(i);
                c++;
            }
        }*/

        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;
            }
            System.out.println(i);
        }

```
### 循环标识符
```java
/*
         *  循环标号: 就是给循环起标号，结合 break continue 关键字一起使用
         *
         * */

        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.println("*");
                // 直接可以结束外层循环
                break outer;
            }
        }
```
## 数组

1. 概念:存储多个变量的容器 且 需存相同数据类型的数据(java 中 数组的长度是固定的)

2. 数组的定义**数据类型[] 数组名 = new 数据类型[元素个数或数组长度];**
```java
       // 定义数组的格式
        // 标准型
        int[] arr1 = new int[5];
        // 完整型
        int[] arr2 = new int[]{11,22,33};
        arr2 = new int[]{44,55,66}; // 再次赋值
        // 简化
        int[] arr3 = {11,22,33};
```
3. 元素的默认值
![图片](./img/15.png)

4. 数组的遍历
```java
        int[] arr = new int[] {11,22,33,44,55};

//        正序
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }

        System.out.println("******************************");

//        倒序
        for (int i = arr.length - 1; i >= 0 ; i--) {
            System.out.println(arr[i]);
        }
```

5. 数组的基本操作
```java
int[] arr = { 1, 2, 3, 4, 5 };  
String arrString = Arrays.toString(arr);  
   
// 直接输出，为内存地址
System.out.println(arr);  
// [I@139a55
   
System.out.println(arrString );  
// [1, 2, 3, 4, 5]  

1. 检查一个数组是否包含某值
String[] arr= { "a", "b", "c", "d", "e" };  
boolean b = Arrays.asList(arr).contains("a");  
System.out.println(b);  
// true 

2. 逆向输出一个数组
int[] arr= { 1, 2, 3, 4, 5 };  
ArrayUtils.reverse(intArray);  
System.out.println(Arrays.toString(intArray));  
//[5, 4, 3, 2, 1]

int[] arr = { 1, 2, 3, 4, 5 };
int[] revArr = new int[arr.length];
for(int i = 0; i < arr.length; i++){
    revArr[i] = arr[arr.length - i -1];
}
System.out.println(Arrays.toString(revArr));
//[5, 4, 3, 2, 1]

//        优化代码  减少循环
int[] arr = { 1, 2, 3, 4, 5 };
        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }

3. 移除数组中的元素
int[] arr= { 1, 2, 3, 4, 5 };  
int[] removed = ArrayUtils.removeElement(arr, 3);//create a new array  
System.out.println(Arrays.toString(removed))


4. 数组排序
        /*
        *  冒泡排序  : 外层控制轮数  内层控制次数
        *       轮数     数组长度 - 1
        *
        *       比较次数  数组长度 - i
        * */

        int[] arr = {45,58,21,63,66};

//        for (int i = 1; i < arr.length; i++) {
//            for (int j = 0; j < arr.length - i; j++) {
//                if (arr[j] > arr[j+1]){
//                    int temp = arr[j];
//                    arr[j] = arr[j+1];
//                    arr[j+1] = temp;
//                }
//            }
//        }

        System.out.println(Arrays.toString(arr));

 /*
        *  选择排序:
        *       外层控制选择索引
        *       内层控制对比索引
        *
        * */
        int[] arr = {11,55,44,85,36,25};

        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i + 1; j < arr.length ; j++) {
                if (arr[i] > arr[j]){
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
```
## 集合

1. 定义
```java
/*
         *  ArrayList 集合:
         *
         *   格式: 类名<元素类型> 变量 = new 类名<元素类型>()
         *   注意: 类型不能用基本数据类型，使用基本数据类型对应的引用数据类型写法
         *          首字母大写: byte  short long float double boolean
         *          特殊类型:  int -> Integer   char ->  Character
         * */

//        定义 :

//        字符串型
        ArrayList<String> list1 = new ArrayList<>();
//        长整型
        ArrayList<Long> list2 = new ArrayList<>();
//        整型
        ArrayList<Integer> list3 = new ArrayList<>();
//        浮点型
        ArrayList<Double> list4 = new ArrayList<>();
//        字符型
        ArrayList<Character> list5 = new ArrayList<>();

```
2. 集合的操作
```java
        /*
         *  集合的操作:
         *       size: 获取集合的长度
         *       get(index):  获取集合中的某个元素
         *       add : 元素添加到集合的末尾，添加的元素要和定义集合的数据类型一致且符合该类型的范围
         *
         * */
        ArrayList<String> list1 = new ArrayList<>();

//        集合的元素添加

//        list1.add("张三");
//        System.out.println(list1);
//        System.out.println(list1.size());
//        list1.add("里斯");
//        System.out.println(list1.get(1);

//        集合的快速添加
        Collections.addAll(list1, "张三", "李四", "王五");
        System.out.println(list1);
```
3. 遍历
```java
 ArrayList<String> list1 = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            list1.add("哈哈" + i);
        }
//        System.out.println(list1);
        
//        正向遍历
        for (int i = 0; i < list1.size(); i++) {
            System.out.println(list1.get(i));
        }

        System.out.println("----------------------");
        
//        倒叙遍历
        for (int i = list1.size() - 1; i >= 0; i--) {
            System.out.println(list1.get(i));
        }
```
```java
       /*
         * 练习题 ：求和  最值  元素的查找
         * */

        ArrayList<Integer> list = new ArrayList<>();
        Collections.addAll(list, 11, 22, 33, 44, 55, 66);

//        求和
//        int sum = 0;
//
//        for (int i = 0; i < list.size(); i++) {
//            sum += list.get(i);
//        }
//        System.out.println(sum);

//        求平均值(注意小数位丢失的问题)

//        double avg = 1.0 * sum / list.size();
//        System.out.println(avg);

//        求最值

//        int max = list.get(0), min = list.get(0);
//        for (int i = 1; i < list.size(); i++) {
////            最大值
//            if (max < list.get(i)) {
//                max = list.get(i);
//            }
////            最小值
//            if (min > list.get(i)) {
//                min = list.get(i);
//            }
//        }
//        System.out.println(max);
//        System.out.println(min);

//        元素查找
//        int findnum = 22, index = -1;
//        for (int i = 0; i < list.size(); i++) {
//            if (findnum == list.get(i)) {
//                index = i;
//                break;
//            }
//        }
//        System.out.println(index != -1 ? "元素:"+findnum+"索引:"+index:"未找到元素" + findnum);
```
## 方法

1. 定义
![图片](./img/16.png)
```java
 public static void main(String[] args) {
        /*
         *  函数：
         *     方法名采用小驼峰
         *     void 代表无返回值 放在函数名的前面  有返回值时需要指定 返回值类型 方法体末必须return返回值
         *     参数列表  定义在() 中 称为形参  不能用=号赋值
         *
         * */

//      普通调用
        int result = Demo01.getSum(10,20);
        System.out.println(result);
//      本类内部调用忽略类名

//        getSum(10,20);
    }

    public static int getSum(int num1, int num2) {
        int sum = num1 + num2;
        return sum;
    }
```
## 成员变量&局部变量
```java
//    public static void main(String[] args) {
    /*
     *  局部和成员变量 ：根据作用域范围区分
     * */

//    }
//    成员变量 （定义在方法外、类中的变量; 在改类的任意位置有效）
//    绕开就近原则的 直属调用： 类名.成员变量名
//    static int b = 20;

//    public static void run(){
//        // 局部变量 仅在方法内部可用，形参也是一种局部变量
//        int a = 10;
//        System.out.println(a);
//    }


//    练习题

    /*static int num = 0;

    public static void main(String[] args) {
        int num = 1;
        num++; // 局部 2

        run1(num);
        run1(BianLiang.num++); // ++ 之后成员变量 1

        System.out.println(num); // 2
        System.out.println(BianLiang.num); // 1
    }

    public static void run1(int num) {
        num++;// 改方法内部的形参 num 1
    }*/

   /* static int num = 0;

    public static void main(String[] args) {
        int num = 1;
        num++; // 局部 2
        num = run1(BianLiang.num++); // 成员变量 1 返回值 1 赋值给局部变量num

        System.out.println(num); // 1
        System.out.println(BianLiang.num); // 1
    }
    public static int run1(int num){
        return BianLiang.num+=num++;
    }*/
```
## 字符串String
```java
    public static void main(String[] args) {
        /*
         *  字符串：代表一个字符序列，其底层为字符数组。
         *
         * */

//        创建方式

//        String str1 = new String("java"); // 完整

//        String str2 = "java"; // 快捷

//        char数组形式创建字符串
        char[] arr = {'h', 'e', 'l', 'l', 'o'};

//        String str1 = new String(arr);
//        System.out.println(str1);

//        将char数组 截取指定长度变为字符串
        String str1 = new String(arr, 1, 3);
        System.out.println(str1);   //ell

//        小结：
//        1、若仅需要对字符串进行创建保存：  String 变量名="值";
//        2、若需要将字符数组转为字符串：  new String(char[] value);
//        3、若需要将字符数组指定长度变为字符串： new String(char[] value,int offset,int count);
//        4、创建新对象：new String("");

    }
```
### 相关方法
1. 判断方法
```java
        String str = "helloWorld";

//      startsWith 是否以 xx 开头
        System.out.println(str.startsWith("hello"));

//      endsWith 是否以 xx 结尾
        System.out.println(str.endsWith("world"));

//      contains 是否包含 xx 字符串
        System.out.println(str.contains("wo"));

//      equals 是否与指定内容相等
        System.out.println(str.equals("helloworld"));

//      equalsIgnoreCase 是否与指定内容相等 (忽略大小写)
        System.out.println(str.equalsIgnoreCase("helloworld"));

//      isEmpty 当前字符串是否为空 true表示空
        System.out.println(str.isEmpty());
```
2. 转换
```java
        String str1 = "  java,javaScript  ";
//        String str1 = "javaScript";

//        去除两端空格
        System.out.println(str1.trim());
//        转成大写
        System.out.println(str1.toUpperCase());
//        转成小写
        System.out.println(str1.toLowerCase());
//        截取 根据索引 空格也算  substring(start,end) 包含开始不包含结束
        System.out.println(str1.substring(4));
//        替换
        System.out.println(str1.replace(',', '.'));
//        变为字符串
        char[] arr = {'l', 'o', 'v', 'e'};
        System.out.println(Arrays.toString(arr)); // 返回字符串数组 [l, o, v, e]
        System.out.println(new String(arr)); // love
//        toCharArray变为字符数组
        char[] arr1 = str1.toCharArray();
        for (int i = 0; i < arr1.length; i++) {
            System.out.print(arr1[i] + ",");
        }
        System.out.println("\n");
//        切割split
        System.out.println(Arrays.toString(str1.trim().split(",")));
```
3. 查找&其他方法
```java

//        查找方法
        String str = "FanZhiWei";

//        charAt返回指定索引字符
        System.out.println(str.charAt(3));
//        寻找指定字符串 参数: ① 要找的字符串 ②寻找的起始位置 ③ 未找到返回-1
        System.out.println(str.indexOf("Zhi")); // 3


//        其他方法

//        获取字符串长度
        System.out.println(str.length());
//        比较两个字符串的大小 compareTo  返回:正数(str1大) 0 (一样大) 负数 (str2大)
        String str1 = "abc", str2 = "def";
        System.out.println(str1.compareTo(str2));
//        字符串拼接 concat
        System.out.println(str1.concat(str2));
```