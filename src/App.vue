<template>
  <div>
    <router-view />
    <header>
      <h4>{{ getCurrentUser.username }}</h4>
      <h4>{{ getCurrentUser.email }}</h4>
      <NotificationComponent ref="notification" />

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
import NotificationComponent from './components/NotificationComponent.vue';
import { eventBus } from './utils/eventBus';
import connectWebSocket from './utils/websocket.js';

export default {
  components: {
      NavBar,
      NotificationComponent,
    },
  
  data() {
    return {
      selectedLanguage: store.state.locale,
    };
  },
  
  computed: {
    ...mapGetters(['getCurrentUser', 'getTestString']),
  },

  watch: {
    selectedLanguage(newLang) {
      this.$i18n.locale = newLang;
      store.commit('setLocale', newLang)
    },
  },
  
  methods: {
    ...mapActions(['updateTestString']),
    changeTestString() {
      this.updateTestString('New Test String');
    },
    handleNewNotification(message) {
      this.$refs.notification.displayNotification(message);
    },
  },
  
  mounted() {
    connectWebSocket();
    eventBus.on('new-notification', this.handleNewNotification);
  },
  unmounted() {
    eventBus.off('new-notification', this.handleNewNotification);
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
  