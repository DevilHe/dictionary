$(document).ready(function () {
  // 直接实现
  document.onclick = function (e) {
    e = e || window.event // 处理兼容，获取事件对象
    var o = e.target || e.srcElement // 处理兼容，获取事件目标
    console.log(o)
    $('#labelName').val(o.tagName.toLowerCase())
  }

  // 优雅实现
  function elementName (evt) {
    evt = evt || window.event
    var selected = evt.target || evt.srcElement
    var eleName = selected && selected.tagName ? selected.tagName.toLowerCase() : 'no tagName'
    $('#labelName2').val(eleName)
  }

  var el = document.getElementsByTagName('body')
  el[0].onclick = elementName
})
