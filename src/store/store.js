import { createStore } from 'vuex';

const state = {
  locale: localStorage.getItem('locale'),
};

const mutations = {
  setLocale(state, locale) {
    state.locale = locale;
    localStorage.setItem('locale', locale);
  },
};

const actions = {
  changeLocale({ commit }, locale) {
    commit('setLocale', locale);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  modules: {},
});

export default store;