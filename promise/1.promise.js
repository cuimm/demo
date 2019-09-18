/*
  1、可以解决并发问题（同步多个异步方法的执行结果）
  2、可以解决链式调用问题，解决多个回调嵌套问题（先获取name，再通过name获取age）

  Promise是一个类
  1、每次 new 一个Promise，都需要传递一个执行器，执行器是立即执行的
  2、执行器函数中有两个参数 resolve，reject
  3、默认Promise有三个状态 pending -> FULFILLED（resolve 表示成功了），rejected（reject 表示失败了）
  4、如果一旦成功了，不能变成失败；一旦失败了，不能再成功了。只有状态是pending的时候才能更改状态
  5、每个 promise 都有一个 then 方法，then会返回一个全新的promise
* */
const PROMISE_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
class MyPromise {
  constructor(executor) {
    // 状态
    this.status = PROMISE_STATUS.PENDING
    // 成功队列
    this.fullfilledQueues = []
    // 失败队列
    this.rejectQueues = []

    this.resolve = (data) => {
      console.log('resolve', data);
      if (this.status !== PROMISE_STATUS.PENDING) return

      this.status = PROMISE_STATUS.FULFILLED
      this.value = data

      this.fullfilledQueues.forEach(cb => {
        cb(this.value)
      })
    }
    this.reject = (error) => {
      console.log('reject', error);
      if (this.status !== PROMISE_STATUS.PENDING) return

      this.status = PROMISE_STATUS.REJECTED
      this.value = error

      this.rejectQueues.forEach(cb => {
        cb(this.value)
      })
    }

    executor(this.resolve, this.reject)
  }

  then(onFulfilled, onRejected) {
    if (this.status === PROMISE_STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === PROMISE_STATUS.REJECTED) {
      onRejected(this.value)
    }
    if (this.status === PROMISE_STATUS.PENDING) {
      this.fullfilledQueues.push(onFulfilled)
      this.rejectQueues.push(onRejected)
    }
  }
}

let p = new MyPromise((resolve, reject) => {
  // 同步
  // reject(123)
  // 异步
  setTimeout(() => {
    reject(123)
  }, 1000)
})

p.then((data) => {
  console.log('then', data);
},(error) => {
  console.log('error', error);
})
  // .then(() => {
  //   console.log('dsds');
  // })







