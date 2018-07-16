const state = {
  lists: [],
  path: "",
  query: "",
}

const mutations = {
  getMore(state, data) {
    console.log("%cmutations触发", "color:blue");
    console.log(data, "mutations的data");
    if (data.path == "movie") {
      state.lists = data.res.data.subjects;
      console.log(state.lists,"state.lists");
    } else {
      state.lists = data.res.data.books;
      console.log(state.lists,"state.lists");
    }

  }
}

const actions = {
  getMore({commit, state}, data) {
    console.log("%cactions", "color:blue");
    console.log(data, "actions的data");
    return new Promise(resolve => {
      data._this.$http.get("/api/v2/" + data.path + "/" + data.query)
        .then(res => {
          commit({
            type: 'getMore',
            path: data.path,
            res: res
          })
        })
      resolve("success");
    })
  }
}

const getters = {
  lists: state => {
    return state.lists.slice(0, 18);
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
