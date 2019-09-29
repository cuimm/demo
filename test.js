let a = {'aa':'aa', 'bb':'bb'}
console.log(...a);


/**
 * @param {string} somebody Somebody's name.
 */
function sayHello(somebody) {
  alert('Hello ' + somebody);
}

sayHello()

/**
* 根据key值从数组中筛选出对应的text
* @param {number|String} key - 要筛选的key值
* @param {Array} options - 选项
* @param {Number|String} options.id - options的id属性
* @param {String} options.text - options的text属性
* */
const getTextFromOptions = (key, options = []) => {
  const selectedOption = options.find((option)=>{
    if(String(option.id) === String(key)) {
      return true
    }
    return false
  })
  if (selectedOption) {
    return selectedOption.text || selectedOption.id || key
  }
  return ''
}


getTextFromOptions()
