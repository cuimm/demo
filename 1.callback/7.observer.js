// 被观察者
class Subject {
  constructor() {
    this.arr = [] // arr里面存放的是观察者
    this.state = '我很开心'
  }
  attach(o) {
    this.arr.push(o)
  }
  setState(newState) {
    this.state = newState
    this.arr.forEach(o => {
      o.update(newState)
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(newState) {
    console.log(this.name + '的小宝宝：' + newState);
  }
}


let o1 = new Observer('我')
let o2 = new Observer('我妹')
let s = new Subject('鸣鸣')
s.attach(o1)
s.attach(o2)
s.setState('我不开心了')
