import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'

import * as actions from './tasks-list/actions'
import * as getters from './tasks-list/getters'
import tasksList from './tasks-list/store'

// Vue.use(VueResource)
Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        tasksList
    }
})