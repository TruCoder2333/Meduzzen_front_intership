import { createStore } from 'vuex';
import userCrud from './userCrud';
import companyCrud from './companyCrud';

const state = {
  testString: "Test String",
  locale: localStorage.getItem('locale'),
  isAuthenticated: false, 
  currentUser: '',
  token: localStorage.getItem('token'), 
};

const mutations = {
  setTestString(state, newTestString) {
    state.testString = newTestString;
  },
  setLocale(state, locale) {
    state.locale = locale;
    localStorage.setItem('locale', locale);
  },
  setToken(state, token) {
    state.token = token; 
    localStorage.setItem('token', token); 
  },
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
};

const actions = {
  updateTestString({ commit }, newTestString) {
    commit('setTestString', newTestString);
  },

  changeLocale({ commit }, locale) {
    commit('setLocale', locale);
  },

  authenticate({ commit },  token) {
    commit('setAuthentication', true);
    commit('setToken', token);
  },

};

const getters = {
  getTestString: (state) => state.testString,
  isAuthenticated: (state) => state.isAuthenticated,
  getCurrentUser: (state) => state.currentUser,
};


const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    userCrud,
    companyCrud,
  },
});

export default store;