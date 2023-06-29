import { createStore } from 'vuex';

const store = createStore({
  state: {
    authToken: null,
  },
  mutations: {
    SET_AUTH_TOKEN(state, authToken) {
      state.authToken = authToken;
    },
  },
  actions: {
    // Vos autres actions ici...
  },
  getters: {
    // Vos getters ici...
  },
});

export default store;
