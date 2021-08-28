let age;
((name,nl) => {
    age = nl;
    console.log(`我叫${name},今年${age}`);
}
)('张三',20)

module.exports = {
    age:age,
    name:'哈哈哈'
}