import { createStore } from 'vuex';

const state = {
  testString: "Test String",
  locale: localStorage.getItem('locale'),
};

const mutations = {
  setTestString(state, newTestString) {
    state.testString = newTestString;
  },
  setLocale(state, locale) {
    state.locale = locale;
    localStorage.setItem('locale', locale);
  },
};

const actions = {
  updateTestString({ commit }, newTestString) {
    commit('setTestString', newTestString);
  },

  changeLocale({ commit }, locale) {
    commit('setLocale', locale);
  },
};

const getters = {
  getTestString: (state) => state.testString,
};


const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});

export default store;