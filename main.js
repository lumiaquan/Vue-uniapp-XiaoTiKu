import Vue from 'vue'
import App from './App'

import common from 'common.js'

Vue.config.productionTip = false

Vue.prototype.$common = common

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
