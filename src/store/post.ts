interface State {
  postList: string[];
};

const post = {
  state: () => ({
    postList: [],
  }),

  getters: {
    postList: (state: State) => state.postList,
  },

  mutations: {
    updatePostList: (state: State, payload: string[]) => {
      state.postList = payload;
    },
  },
  namespaced: true,
};

export default post;
