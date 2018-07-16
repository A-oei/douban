const state= {
  loading: false
};

const mutations={
  isVisible(state,bool){
    state.loading=bool;
  }
}

export default {
  state,
  mutations
}
