interface State {
  socketUserId: string;
  socketUserName: string;
};

const socket = {
  state: () => ({
    socketUserId: '',
    socketUserName: '',
  }),

  getters: {
    socketUserId: (state: State) => state.socketUserId,
    socketUserName: (state: State) => state.socketUserName,
  },

  mutations: {
    updateSocketUserId(state: State, id: string) {
      state.socketUserId = id;
    },
    updateSocketUserName(state: State, socketUserName: string) {
      state.socketUserName = socketUserName;
    },
  },
  namespaced: true,
};

export default socket;
