const Promise = require('./1.promise')

let p = new Promise((resolve, reject) => {
  // 同步
  // resolve(123)

  // 异步
  setTimeout(() => {
    resolve(123)
  }, 1000)

  // 报错
  // throw new Error('error123')
})

let p2 = p.then((data) => {
  console.log('then：', data);
  // setTimeout(() => {
  //   return 1999
  // }, 1000)

  // return new Promise(() => {})
  return new Promise((resolve, reject) => {
    resolve(123)
  })
  // throw new Error()
  // return 'hello'
}, (error) => {
  console.log('error：', error);
})

p2.then((data) => {
  console.log('p2 success：', data);
}, (error) => {
  console.log('p2 error：', error);
})
