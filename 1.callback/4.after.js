
// after 可以生成新的函数，等待函数执行次数打到预期时执行
const after = (times, fn) => {
  return () => {
    times = times - 1
    if (times === 0) {
      fn()
    }
  }
}

let newAfter = after(3, () => {
  console.log('三次后调用');
})

newAfter()
newAfter()
newAfter()

