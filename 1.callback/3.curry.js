const sum = (...args) => {
  let result = 0
  let numbers = [...args]
  const fn = (...fnArgs) => {
    numbers = numbers.concat(fnArgs)
    return fn
  }
  fn.valueOf = function () {
    numbers.forEach(item => {
      result += item
    })
    console.log('numbers', numbers);
    return result
  }
  return fn
}

console.log(sum(1, 2)(3, 4)(5).valueOf());
console.log(sum(1, 2, 3, 4).valueOf());


// 柯里化
const add = (a, b, c, d, e) => {
  return a + b + c + d + e
}
const currying = (fn, arr = []) => {
  const len = fn.length // 函数的长度就是参数的个数
  return (...args) => {
    arr = arr.concat(args)
    if (arr.length < len) {
      return currying(fn, arr)
    }
    return fn(...arr)
  }
}
console.log(currying(add)(1, 2, 3, 4, 5));
console.log(currying(add)(1)(2)(3)(4)(5));

// 检测数据类型
const checkType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}

const checkTypeCurrying = (type) => {
  return (content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

const utils = {}

const types = ['Number', 'String', 'Object', 'Boolean']
// types.forEach(type => {
//   utils[`is${type}`] = checkTypeCurrying(type)
// })
//
// console.log(utils.isNumber(23));

// 柯里化实现
types.forEach(type => {
  utils[`is${type}`] = currying(checkType)(type)
})
console.log(utils.isNumber(23));










