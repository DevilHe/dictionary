// 实现格式化输出，比如输入999999999，输出999,999,999
// 1.普通版
function formatNumber(num) {
  let arr = [],
    str = num + '',
    count = str.length;
  while(count >= 3){
    arr.unshift(str.slice(count - 3, count));
    count -= 3;
  }
  str.length % 3 && arr.unshift(str.slice(0, str.length % 3));
  return arr.toString();
}
console.log('普通版', formatNumber(1234567890));

// 2.进阶版
function formatNumber2(num) {
  return num.toString().split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}
console.log('进阶版', formatNumber2(1234567890));

// 3.正则版
function formatNumber3(num) {
  return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
console.log('正则版', formatNumber3(1234567890));

// 4.Api版
// toLocaleString
function formatNumber4(num) {
  return num.toLocaleString('en-US')
}
console.log('Api版1', formatNumber4(1234567890));
// Intl IE兼容性不好
function formatNumber5(num) {
  return new Intl.NumberFormat().format(num)
}
console.log('Api版2', formatNumber5(1234567890));