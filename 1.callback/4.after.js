//
// // after 可以生成新的函数，等待函数执行次数打到预期时执行
// const after = (times, fn) => {
//   return () => {
//     times = times - 1
//     if (times === 0) {
//       fn()
//     }
//   }
// }
//
// let newAfter = after(3, () => {
//   console.log('三次后调用');
// })
//
// newAfter()
// newAfter()
// newAfter()
//

/*
(function () {
  // var a = 1;
  // b = 1;
  var b = 1;
  var a = b;
  console.log(a);
  console.log(b);
})()
console.log(typeof a);
console.log(typeof b);
*/

/*
var t = 10
function test(t) {
  var t = t++
  console.log(t);
  console.log(t);
}
test(t)
console.log(t);
*/
var obj = {proto: {a:1, b:2}}
function F() {}
F.prototype = obj.proto
var f = new F()
obj.proto.c = 3
obj.proto = {a:-1, b:-2}

console.log(obj.proto);
console.log(F.prototype);
console.log(F.prototype === obj.proto);

console.log(f.a);
console.log(f.c);
delete F.prototype['a']
console.log(f.a);
console.log(obj.proto.a);

console.log('------------------');

var o1 = {a:1, b:2}
var o2 = o1
console.log(o1 === o2); // true

o1.c = 3
o1 = {x:2}
console.log(o1 === o2); // false
console.log(o1);  // { x: 2 }
console.log(o2);  // { a: 1, b: 2, c: 3 }


