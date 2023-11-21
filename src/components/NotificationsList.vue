<template>
  <button @click="showNotifications=true">{{ $t('getAllNotifications') }}</button>

  <div v-if="showNotifications">
    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.text }} {{ notification.status }}
      </li>
    </ul>
    <button @click="showNotifications=false">{{ $t('close') }}</button>
  </div>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance';
import { eventBus } from '@/utils/eventBus';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      notifications: [],
      showNotifications: false
    };
  },

  computed: {
    ...mapGetters(['getCurrentUser']),
  },

  methods: {
    fetchNotifications() {
      axiosInstance.get(`/users/${this.getCurrentUser.id}/get_notifications/`)
        .then(response => {
          this.notifications = response.data;
        });
      console.log('Id', this.getCurrentUser.id);
    },
    handleNewNotification(newNotification) {
      this.notifications.push(JSON.parse(newNotification));
    }
  },

  created() {
    this.fetchNotifications();
    eventBus.on('new-notification', this.handleNewNotification);
  },
  
  beforeUnmount() {
    eventBus.off('new-notification', this.handleNewNotification);
  },
  
};
</script>

  