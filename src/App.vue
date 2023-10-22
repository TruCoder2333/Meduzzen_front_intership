<template>
  <div>
    <router-view />
    <header>
      <h4>{{ username }}</h4>
      <h4>{{ email }}</h4>
      <NavBar />
    </header>
    <select v-model="selectedLanguage">
            <option value="en">English</option>
            <option value="ua">Українська</option>
    </select>
    
    
    <p>{{ getTestString }}</p>
    <button @click="changeTestString">Change Test String</button>

    <footer>
      <p>&copy; 2023 My Vue App</p>
    </footer>
  </div>
</template>
  
<script>
import NavBar from '/app/src/components/NavBar.vue' 
import store from './store/store'
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedLanguage: store.state.locale,
    };
  },
  
  components: {
      NavBar,
    },
  watch: {
    selectedLanguage(newLang) {
      this.$i18n.locale = newLang;
      store.commit('setLocale', newLang)
    },
  },
  computed: {
    ...mapGetters(['username', 'email', 'getTestString']),
  },
  methods: {
    ...mapActions(['updateTestString']),
    changeTestString() {
      this.updateTestString('New Test String');
    },
  },
  };

  </script>
  
  <style>
  /* Add your styles for the App.vue component */
  body {
    font-family: Arial, sans-serif;
  }
  /* ... other styles */
  </style>
  