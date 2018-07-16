import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import isVisible from './modules/isVisible'
import User from './modules/user'
import More from  './modules/more'
import Loading from  './modules/loading'

export default new Vuex.Store({
  modules:{
    Loading,
    isVisible,
    User,
    More
  }
})
