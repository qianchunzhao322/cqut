import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import permission from '@/directive/permission/index.js'
Vue.use(permission)
import '@/utils/scroll'

import baseLayout from '@/components/baseLayout/up-center-down-container'
Vue.component('base-layout', baseLayout)

import CopyIcon from '@/components/CopyIcon'
Vue.component('copy-icon', CopyIcon)

import Etable from '@/components/Etable'
Vue.component('Etable', Etable)

import defaultSettings from '@/settings'
Vue.prototype.defaultSettings = defaultSettings

// preview image
import previewImage from '@/components/PreviewImage'
Vue.component('preview-img', previewImage)

// vconsole
// import Vconsole from 'vconsole'
// new Vconsole()

import '@/assets/font/iconfont.css' // iconfont

// https://iconpark.oceanengine.com/
import { CheckOne } from '@icon-park/vue'
import '@icon-park/vue/styles/index.css'
import 'windi.css'
Vue.component('check-one', CheckOne)

// vue-clipboard2
// https://www.npmjs.com/package/vue-clipboard2
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// lodash
import _ from 'lodash'
Vue.prototype._ = _;

// tools
import {
  getShowCityValue,
  getDay,
  showTime,
  getTableValue,
  getBirthDay
} from '@/utils/tools'
Vue.prototype.getShowCityValue = getShowCityValue
Vue.prototype.getDay = getDay
Vue.prototype.showTime = showTime
Vue.prototype.getTableValue = getTableValue
Vue.prototype.getBirthDay = getBirthDay

import hevueImgPreview from 'hevue-img-preview'
Vue.use(hevueImgPreview, {
  clickMaskCLose: true
})

import debounceDirective from '@/utils/debounce.js'
Vue.directive('debounce', debounceDirective)

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import echarts from 'echarts'// echarts
Vue.prototype.$echarts = echarts

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// loading
function startLoading(target = 'main-container') {
  this.$nextTick(() => {
    if (!Vue.prototype.$currentLoading) {
      const load = Vue.prototype.$loading({
        target: document.querySelector(`.${target}`),
        lock: true,
        text: '数据加载中...',
        customClass: 'custom-class'
      })
      Vue.prototype.$currentLoading = load
    }
  })
}
function closeLoading() {
  if (Vue.prototype.$currentLoading) {
    Vue.prototype.$currentLoading.close()
    Vue.prototype.$currentLoading = null
  }
}
Vue.prototype.$startLoading = startLoading
Vue.prototype.$closeLoading = closeLoading
Vue.prototype.$currentLoading = null

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
