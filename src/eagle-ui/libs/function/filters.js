import Vue from 'vue'
import { formatImage, formatDate, formatTime, formatHtml } from './common-methods'

Vue.filter('imageFilter', formatImage)
Vue.filter('dateFilter', formatDate)
Vue.filter('timeFilter', formatTime)
Vue.filter('htmlFilter', formatHtml)
