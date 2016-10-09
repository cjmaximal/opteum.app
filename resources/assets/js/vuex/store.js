import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'

import * as actions from './actions'
import * as getters from './getters'
import ProposalsList from './modules/proposals'

// Vue.use(VueResource)
Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        ProposalsList
    }
})