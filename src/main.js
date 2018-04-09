// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Axios from "axios"
import qs from "qs"
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.prototype.$axios = Axios
Vue.prototype.HOST = '/api'

Axios.defaults.baseURL = 'http://localhost:8888';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
Axios.interceptors.request.use(function(config) {

	if (config.method == "post") {
		config.data = qs.stringify(config.data)
	}

	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function(response) {

	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

Vue.use(ElementUI);
Vue.use(router);
Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
