window.onload = function () {
  // 1.实现方式一：classList
  document.getElementById('div1').classList.add('name1')

  // 2.实现方式二：className
  function isHasClassName (target, arr) {
    for (var i in arr) {
      if (target === arr[i]) {
        return true
      }
    }
  }
  function addClass (ele, addName) {
    if (!ele.className) {
      // class非空的时候，再判断要添加的类目是不是已经存在
      ele.className = addName
      // class名为空的时候，直接赋值
    } else {
      // 非空
      if (!isHasClassName(addName, ele.className.split(' '))) {
        // 不存在要添加的class名
        ele.className += ' ' + addName
      }
    }
  }
  addClass(document.getElementById('div2'), 'name2')

  // 3.实现方式三：className
  function hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
  function addClass2 (obj, cls) {
    if (!hasClass(obj, cls)) obj.className += '' + cls
  }
  addClass2(document.getElementById('div3'), 'name3')
}
