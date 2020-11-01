window.onload = function () {
  // 1)防抖
  // 原理：在时间被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
  // 适用场景：
  // 1.按钮提交场景：防止多次提交按钮，只执行最后提交的一次
  // 2.搜索框联想场景：防止联想发送请求，只发送最后依次输入
  // 一、简易版实现
  function debounce1 (func, delay) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, delay)
    }
  }

  // 处理函数
  var num1 = 0
  function handle1 () {
    num1++
    console.log('防抖提交' + num1)
  }
  // 点击事件
  document.getElementById('submit1').addEventListener('click', debounce1(handle1, 2000))
  // 输入事件
  function handleKey () {
    var val = document.getElementById('input').value
    console.log('输入值为：' + val)
  }
  document.getElementById('input').addEventListener('keyup', debounce1(handleKey, 2000))

  // 二、立即执行版实现
  // 有时希望立即执行函数，然后等到停止触发n秒后，才可以重新触发执行。
  function debounce2 (func, delay, immediate) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(function () {
          timeout = null
        }, delay)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, delay)
      }
    }
  }

  // 处理函数
  var num2 = 0
  function handle2 () {
    num2++
    console.log('防抖立即执行提交' + num2)
  }
  // 点击事件
  document.getElementById('submit2').addEventListener('click', debounce2(handle2, 2000, true))

  // 三、返回值版实现
  // func函数可能会有返回值，所以需要返回函数结果，但是当immediate为false的时候，因为使用了setTimeout，我们将func.apply(context, args)的返回值赋给变量，最后再return的时候，值将会一直是undefined，所以只在immediate为true的时候返回函数的执行结果。
  // function debounce3 (func, delay, immediate) {
  //   let timeout, result
  //   return function () {
  //     const context = this
  //     const args = arguments
  //     if (timeout) clearTimeout(timeout)
  //     if (immediate) {
  //       const callNow = !timeout
  //       timeout = setTimeout(function () {
  //         timeout = null
  //       }, delay)
  //       if (callNow) result = func.apply(context, args)
  //     } else {
  //       timeout = setTimeout(function () {
  //         func.apply(context, args)
  //       }, delay)
  //     }
  //     return result
  //   }
  // }

  // 2)节流
  // 原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
  // 适用场景：
  // 1.拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
  // 2.缩放场景：监控浏览器resize
  // 一、使用时间戳实现
  // 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳（最一开始值设为0），如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
  function throttle1 (func, delay) {
    let context, args
    let previous = 0
    return function () {
      const now = +new Date()
      context = this
      args = arguments
      if (now - previous > delay) {
        func.apply(context, args)
        previous = now
      }
    }
  }
  // 处理函数
  var num3 = 0
  function handle3 () {
    num3++
    console.log('节流1:' + num3)
  }
  // 缩放事件
  window.addEventListener('resize', throttle1(handle3, 2000, true))

  // 二、使用定时器实现
  // 当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
  function throttle2 (func, delay) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null
          func.apply(context, args)
        }, delay)
      }
    }
  }
  // 处理函数
  var num4 = 0
  function handle4 () {
    num4++
    console.log('节流2:' + num4)
  }
  // 缩放事件
  window.addEventListener('resize', throttle2(handle4, 2000, true))
}

$(document).ready(function () {
  var count = 0
  $('#btn').click(function () {
    count++
    console.log('第' + count + '次点击')
  })
})
