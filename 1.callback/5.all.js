// 1、我们希望读取数据，node是异步的，会等待同步代码都执行完之后在执行
const fs = require('fs')
const path = require('path')

const wait = time => {
  const now = new Date()
  while (new Date() - now < time) {

  }
}

const school = {}

// 并发的问题如何解决：计数器
const after = (times, fn) => {
  return () => {
    -- times === 0 && fn()
  }
}
let newAfter = after(2, () => {
  console.log(school);
});
fs.readFile(path.join(__dirname, '../assets/name.txt'), 'utf8', (error, data) => {
  wait(1500)
  school['name'] = data
  newAfter()
})

fs.readFile(path.join(__dirname, '../assets/age.txt'), 'utf8', (error, data) => {
  school['age'] = data
  newAfter()
})








