// 数组去重
// 1.排序，比较相邻元素
var a = [1, 31, 4, 25, 7, 12, 8]
var b = [4, 62, 12, 55, 8, 43, 95, 7]
function distinct1 (a, b) {
  let arr = a.concat(b)
  // arr = arr.sort();
  arr = arr.sort(function (a, b) {
    return a - b
  })
  const result = [arr[0]]
  for (let i = 1, len = arr.length; i < len; i++) {
    arr[i] !== arr[i - 1] && result.push(arr[i])
  }
  return result
}
console.log('去重1', distinct1(a, b))

// 2.es6 new Set
function distinct2 (a, b) {
  return Array.from(new Set([...a, ...b]))
}
console.log('去重2', distinct2(a, b))

// 3.利用对象的属性不会重复这一特性，校验数组元素是否重复
function distinct3 () {
  const arr = a.concat(b)
  const result = []
  const obj = {}
  for (const i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}
console.log('去重3', distinct3(a, b))

// 4.支持多维数组
function flat (arr, target) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      flat(item, target)
    } else {
      target.push(item)
    }
  })
}
function flatArr (arr) {
  const result = []

  flat(arr, result)

  return result
}
function uniqueArr (arr) {
  return [...new Set(flatArr(arr))]
}
const result = uniqueArr([1, 2, 3, 4, [3, 4, [4, 6]]])
console.log('多维去重4', result) // 1,2,3,4,6

// Array.prototype.flat兼容性不太好
function uniqueArr2 (arr) {
  return [...new Set(arr.flat(Infinity))]
}
const result2 = uniqueArr2([1, 2, 3, 4, [3, 4, [4, 6, 7]]])
console.log('兼容性多维去重4', result2) // 1,2,3,4,6,7
