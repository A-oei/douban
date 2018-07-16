// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入store
import store from './store'

Vue.config.productionTip = false

//导入公共css
import './libs/aoei.css'

//配置取消点击300毫秒的延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);

//设定全局过滤器
import filters from './filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

//配置loading
import Loading from './components/loading'
Vue.use(Loading);

//自己上传到npm的swiper插件
import swiper from 'aoei-vue-swiper'
Vue.use(swiper)


//配置axios
import axios from 'axios'
Vue.prototype.$http = axios;

axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.commit("isVisible",true)
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.commit("isVisible",false)
  return response;
}, function (error) {
  return Promise.reject(error);
});

//导入下拉加载
import { Loadmore  } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

//配置图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528108606224&di=6be5b6e3d97cfadeb9be09e80cb12b1b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01648957dd72990000012e7e25b5c3.gif"})

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

