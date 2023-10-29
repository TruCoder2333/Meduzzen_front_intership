import { createStore } from 'vuex';
import userCrud from './userCrud'

const state = {
  testString: "Test String",
  locale: localStorage.getItem('locale'),
  isAuthenticated: false, 
  username: '', 
  email: '', 
  
 
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
  setUsername(state, username) {
    state.username = username;
  },
  setEmail(state, email) {
    state.email = email;
  },
  

};

const actions = {
  updateTestString({ commit }, newTestString) {
    commit('setTestString', newTestString);
  },

  changeLocale({ commit }, locale) {
    commit('setLocale', locale);
  },

  authenticate({ commit }, { username, email, token }) {
   
    commit('setAuthentication', true);

    commit('setUsername', username);

    commit('setEmail', email);

    commit('setToken', token);
    
  },

};

const getters = {
  getTestString: (state) => state.testString,
  isAuthenticated: (state) => state.isAuthenticated,
  username: (state) => state.username,
  email: (state) => state.email,
};


const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    userCrud,
  },
});

export default store;