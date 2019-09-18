
// 发布订阅模式
const fs = require('fs')
const path = require('path')

const school = {}

const e = {
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}
e.on(() => {
  console.log('ok');
})
e.on(() => {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
})

fs.readFile(path.join(__dirname, '/assets/name.txt'), 'utf8', (error, data) => {
  school['name'] = data
  e.emit()
})

fs.readFile(path.join(), 'utf8', (error, data) => {
  school['age'] = data
  e.emit()
})


// 发布订阅模式 => 观察者模式（vue watcher）

// 发布订阅模式没有关系的

// 观察者模式：观察者和被观察者有关系

// 观察者模式包含发布订阅






