// 定义string format 方法
/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.format = function(...props) {
  if (!this) return this
  if (props.length > 0) {
    var newstr = this
    for (var i = 0; i < props.length; i++) {
      newstr = newstr.replace('%s', props[i])
    }
    return newstr
  }
  return this
}
