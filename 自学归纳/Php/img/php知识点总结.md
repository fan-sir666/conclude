# Php 知识总结

1. Php的初认识
```txt
Php 和 Java、Python、Go 这些都是服务器语言, 是一种脚本语言,主要应用于 WEB 开发领域。
```
## 运行方式(HTTP 模式)
1. 使用 WAMP (windows+Apache+MySQL+PHP) 集成安装包来搭建这种 PHP 运行环境。
2. PHP 与 Apache 的关系
```txt
PHP 的脚本是通过 Apache 来运行的，所以需要把 PHP 安装成 Apache 的一个模块，然后才可以通过Apache 来运行，当然这些安装 WAMP 这个集成包都已经安装好了。
```
3. WEB服务器
4. B/S架构和C/S架构
5. 在写代码之前我们需要,通过 Apache 配置文件的 DocumentRoot 选项来更改根目录
```txt
1. 在你安装wamp的盘符下进入wamp>Apache2>conf>httpd.conf 进行配置
2. 文件中查找 DocumentRoot和Directory 设置成你需要的目录 E:/university/PhpCourse
3. 重新启动服务即可
```
## 语法
### 变量
```php
<?php 
/* 
注意: index.php 文件运行时直接打开,自定义的文件需要指向具体文件(看地址栏的变化), Parent Directory 上一级目录

① 在php中, 结束标签 ?> 可省略, 但是每一句代码要有 ; 结束符

② 声明变量 $ 符开头

③ 单引号 '' 表示字符串 双引号 "" 具有解析变量的功能;

④ php中的多种输出方法

echo(原样输出)   var_dump() (详情输出)  die()、exit() (输出并终止脚本继续运行)
*/


# 1.变量 (可以包含字母、数字、下划线、汉字,不可以数字开头,采用小驼峰 $getUserPwd 或 下划线进行命名 $get_user_pwd, = 号进行赋值)
/* $name = 'zs';
echo "Iam $name"; */

# 2. 值传递

# 2.1 按值传递 (num2的值改变不会影响num1的值的大小)
/* $num1 = 100;
$num2 = $num1;
var_dump($num2); // int(100)
$num2 = 50;
echo $num1,$num2; */

# 2.2 按引用传递 (num2的值改变会影响num1的值的大小)
$num1 = 100;
$num2 = &$num1;
echo $num2;
$num2 = 50;
echo $num1;
?>
```
### 表单的提交方式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- action 提交的Php脚本路径  method 提交方式默认GET提交 -->
    <!-- <form action="./index.php" method="GET">
        <input type="text" name="user-name">
        <input type="password" name="user-pwd">
        <button type="submit">提交</button>
    </form> -->


    <form action="./index.php" method="POST">
        <input type="text" name="user-name">
        <input type="password" name="user-pwd">
        <button type="submit">提交</button>
    </form>

</body>
</html>
```
```php
<?php
/* 
表单的提交方式:          GET方式    POST方式
获取表单提交的数据通过:   $_GET     $_POST   $_REQUEST可以接受GET和POST的任意一种的提交数据
*/

# GET 方式
/* echo $_GET['user-name'];
echo $_REQUEST['user-pwd']; */

# POST 方式
/* echo $_POST['user-name'];
echo $_REQUEST['user-pwd']; */

// echo var_dump($_POST); // 输出数组
// array(2) { ["user-name"]=> string(2) "zs" ["user-pwd"]=> string(6) "123456" }

```
