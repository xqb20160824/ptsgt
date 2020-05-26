const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//失败toast
function showErrorToast(msg) { 
  wx.showToast({
    title: msg,
	icon: 'none',
    mask: true,
    // image: '/static/images/icon_error.png' //自定义失败图标
  })
}
//成功toast
function showSuccessToast(msg) {
  wx.showToast({
	  icon: 'none',
    title: msg,
  })
}
function toFixed(val,fractionDigits){
  if (null == fractionDigits) {
    fractionDigits = 0;
  }
  var nv = (Math.round(val * Math.pow(10, fractionDigits)) / Math.pow(10,
    fractionDigits)).toString(), sp = nv.split(".");
  if (fractionDigits == 0) {
    return nv;
  }
  if (sp.length == 1) {
    nv += "." + Array(fractionDigits + 1).join("0")
  } else if (sp[1] && sp[1].length < fractionDigits) {
    nv += Array(fractionDigits - sp[1].length + 1).join("0")
  }
  return nv;
}

module.exports = {
  formatTime: formatTime,
  showErrorToast,
  showSuccessToast,
  toFixed
}
