import { createStore } from 'vuex';
import post from './post';
import socket from './socket';

interface State {
  isFirst: boolean;
};

const state = () => ({
  isFirst: true,
});

const getters = {
  isFirst: (state: State) => state.isFirst,
};

const mutations = {
  updateIsFirst: (state: State, payload: boolean) => {
    state.isFirst = payload;
  },
};

const store = createStore({
  modules: {
    post,
    socket,
  },
  state,
  getters,
  mutations,
});

export default store;
