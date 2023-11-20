<template>
  <div v-if="show" class="notification">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
    };
  },
  methods: {
    displayNotification(notification) {
      this.message = notification;
      this.show = true;
      setTimeout(() => (this.show = false), 5000); // Hide after 5 seconds
    },
  },
};
</script>

<style>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffcc00;
  padding: 15px;
  border-radius: 5px;
  /* Add more styling as needed */
}
</style>

  