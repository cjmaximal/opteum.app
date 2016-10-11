/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

// Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
import lodash from 'lodash'
import jquery from 'jquery'

window._ = lodash;
window.$ = window.jQuery = jquery;
require('bootstrap-sass');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'
import store from './vuex/store'
import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueSocketio, ':6001')

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken)

    next();
})

const vm = new Vue({
    el: '#app',
    sockets: {
        VueProposalAdded(data) {
            console.info('Vue Proposal added', data)
            this.$store.dispatch('eventAddProposal', data)
        },
        VueProposalFinished(data) {
            console.info('Vue Proposal finished', data)
            this.$store.dispatch('eventFinishProposal', data)
        },
        VueProposalDeleted(data) {
            console.info('Vue Proposal deleted', data)
            this.$store.dispatch('eventDeleteProposal', data)
        },
        VueProposalFinishing(data) {
            console.info('Vue Proposal Finishing', data)
            this.$store.dispatch('eventProposalFinishing', data)
        },
        VueProposalDeleting(data) {
            console.info('Vue Proposal Deleting', data)
            this.$store.dispatch('eventProposalDeleting', data)
        }
    },
    store,
    render: h => h(App)
}).$mount('#app')

export default vm