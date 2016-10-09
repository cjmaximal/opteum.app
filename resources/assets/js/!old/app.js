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

window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

// Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

import Vue from 'vue'
import VueResource from 'vue-resource'
import store from './vuex/store'
import App from './components/App.vue'

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

new Vue({
    el: '#app',
    store,
    render: h => h(App)
}).$mount('#app');