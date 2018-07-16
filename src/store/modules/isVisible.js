const state = {
  is_visible: true,
}

const mutations = {
  invisible(state) {
    state.is_visible = false;
  },
  visible(state) {
    state.is_visible = true;
  }
}

const getters = {
  is_visible: state => {
    return state.is_visible
  }
}

export default {
  state,
  mutations,
  getters
}




