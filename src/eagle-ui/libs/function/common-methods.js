import $config from 'config/config.js'

function formatImage(value, type) {
  // 定义了3种样式图片 169 代表 16:9 , 43 代表 4:3 , 11 代表 1:1
  // 每种共三个大小 s 代表 small , m 代表 middle ,b 代表 big
  // 共有9种图片 b169 m169 s169 b43 m43 s43 b11 m11 s11
  // 还有不传参数代表原图
  if (/^https?:\/\//.test(value)) {
    return value
  }
  if (/^data:image/.test(value)) {
    return value
  }
  if (!value) {
    value = 'default.png'
  }
  if (type) {
    if (type === 'p_50') {
      return $config.imageUrl + value + '?x-oss-process=image/resize,' + type
    } else {
      return $config.imageUrl + value + '?x-oss-process=style/' + type
    }
  } else {
    return $config.imageUrl + value
  }
}

function formatDate(time, type, style = '-') {
  if (!time) time = new Date()
  time = new Date(time)
  if (/^\d+$/.test(time)) time = new Date(time)
  var month = time.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var day = time.getDate()
  if (day < 10) {
    day = '0' + day
  }
  var hour = time.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = time.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  if (type === 1) {
    return `%s${style}%s%s%s:%s`.format(month, day, ' ', hour, minute)
  } else if (type === 2) {
    return `%s${style}%s${style}%s`.format(time.getFullYear(), month, day)
  } else if (type === 3) {
    return `%s${style}%s`.format(month, day)
  } else if (type === 4) {
    return '%s:%s'.format(hour, minute)
  } else if (type === 5) {
    return '%s年%s月'.format(time.getFullYear(), month)
  } else if (type === 6) {
    return '%s月%s日'.format(month, day)
  } else {
    return `%s${style}%s${style}%s%s%s:%s`.format(time.getFullYear(), month, day, ' ', hour, minute)
  }
}

function formatTime(data) {
  if (data) {
    let h = Math.floor(data / 3600)
    let m = Math.floor((data / 60) % 60)
    let s = Math.floor(data % 60)
    if (h) {
      h = h < 10 ? `0${h}时` : `${h}时`
    } else {
      h = ''
    }
    if (m) {
      m = m < 10 ? `0${m}分` : `${m}分`
    } else {
      m = '0分'
    }
    if (s) {
      s = s < 10 ? `0${s}秒` : `${s}秒`
    } else {
      s = '0秒'
    }
    return h ? h + m : h + m + s
  } else {
    return '0分0秒'
  }
}

function formatHtml(value) {
  if (value) {
    let re = /<\/?.+?\/?>/g
    let content = value.replace(re, '')
    return content
  } else {
    return ''
  }
}

/* 获取当前页带参数的url */
function getCurrentPageUrlWithArgs() {
  // eslint-disable-next-line
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return {
    url,
    urlWithArgs,
    options
  }
}

function getRect(that, selector, all) {
  return new Promise(resolve => {
    uni
      .createSelectorQuery()
      .in(that)
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
  })
}

export { formatImage, formatDate, formatTime, formatHtml, getCurrentPageUrlWithArgs, getRect }
