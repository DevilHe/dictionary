// 数组排序
// 1.reverse() 颠倒数组中的元素
var x = [1, 3, 2, 9, 14, 63, 84, 26, 36]
console.log('x:', x)
var y = x.reverse()
console.log('reverse:', y)

// 2.sort,sort() 自定义排序,基础是按照字符编码(Unicode->UTF-16)进行排序
// asc正序排序(即：从小到大排序)
// desc倒序排序(即：从大到小排序)
var asc = x.sort((a, b) => {
  return a - b
})
console.log('正序', asc)
var desc = x.sort((a, b) => {
  return b - a
})
console.log('倒序', desc)

// 3.冒泡排序
function bubbleSort (arr) {
  var i = arr.length
  var j
  var tempExchangVal
  while (i > 0) {
    for (j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        tempExchangVal = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tempExchangVal
      }
    }
    i--
  }
  return arr
}
var arrSorted = bubbleSort(x)
console.log('冒泡排序', arrSorted)

// 4.快速排序
// https://www.jianshu.com/p/34209c493a79?from=timeline&isappinstalled=0
const quickSort = (array) => {
  const sortFun = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) { // 如果左边的索引大于等于右边的索引说明整理完毕
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j] // 取无序数组最后一个数为基准值
    while (i < j) { // 把所有比基准值小的数放在左边,大的数放在右边
      while (i < j && arr[i] <= baseVal) { // 找到一个比基准值大的数交换
        i++
      }
      arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (j > i && arr[j] >= baseVal) { // 找到一个比基准值小的数交换
        j--
      }
      arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    console.log(i, arr)
    sortFun(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sortFun(arr, j + 1, right) // 将右边的无序数组重复上面的操作
  }
  const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组
  sortFun(newArr)
  return newArr
}
var arr = [9, 3, 1, 14, 2, 63, 84, 26, 36, 18]
console.log('快速排序', quickSort(arr))
