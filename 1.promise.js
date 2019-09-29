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
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}
/*
* resolve：promise2的成功
* reject：promise2的失败
* */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('报错了：TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  // 怎么判断x是不是一个promise
  // 判断x 是不是一个promise，如果x是常量，那就直接用这个结果将promise成功掉即可
  let called
  if ((x !== null && (typeof x === 'object')) || typeof x === 'function') {
    // 这里x可能是一个promise对象
    // 取then可能会发生异常
    try {
      let then = x.then
      if (typeof then === 'function') {
        // 这里只能认为x是一个promise了
        then.call(x, y => {
          if (called) return
          called = true
          // resolve(x)
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return
          called = true
          reject(r)
        })
      } else { // 对象 普通值
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // x 是普通字符串
    resolve(x)
  }
}
class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS.PENDING
    this.value = ''
    this.reason = ''
    this.onFulfilledCallbacks = []
    this.onRejectCallbacks = []
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS.PENDING) {
        this.status = PROMISE_STATUS.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(cb => cb())
      }
    }
    const reject = (error) => {
      if (this.status === PROMISE_STATUS.PENDING) {
        this.status = PROMISE_STATUS.REJECTED
        this.reason = error
        this.onRejectCallbacks.forEach(cb => cb())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // then中没有提供成功或者失败的调用，则会把上一次的参数透传
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
      throw error
    }
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === PROMISE_STATUS.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === PROMISE_STATUS.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              // resolve(x)
              // console.log(promise2, x, resolve, reject);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }})
        })
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}

// 必须测试前 要加这一段代码
// sudo npm install promises-aplus-tests -g 这个是帮我们测试的包
// promises-aplus-tests 1.promise.js
MyPromise.defer = MyPromise.deferred = function() {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

/*
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
    let promise2 = new MyPromise((reslove, reject) => {
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
    })
    return promise2
  }
}
*/

module.exports = MyPromise








