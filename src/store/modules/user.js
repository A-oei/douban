import Vue from 'vue'

const state = {
  user_name: "神经Bing",
  user_img: "https://img3.doubanio.com/icon/up150042361-3.jpg",
  user_city: "北京",
  user_statr: "2016-08-20",
  user_introduce: "单身，汪",
  _this:""
};
const mutations = {
  getUser(state,_this) {
  }
};
const actions = {
  getUser({commit ,state},_this) {
    console.log(_this);
  }
};
const getters = {
  user_name: state => {
    return state.user_name;
  },
  user_img: state => {
    return state.user_img;
  },
  user_city: state => {
    return state.user_city;
  },
  user_statr: state => {
    return state.user_statr;
  },
  user_introduce: state => {
    return state.user_introduce;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
