<template>
  <h1>{{ $t('greetings') }}</h1>
  <button @click="openModal">{{ $t('openModal') }}</button>

  <ModalWindow :visible="isModalVisible" @close="closeModal">
      <h2>{{ $t('modalContent') }}</h2>
  </ModalWindow>
  
</template>

<script>
import ModalWindow from '/app/src/components/ModalWindow.vue'




export default {
  name: 'HomePage',
  components: {
    ModalWindow,
  },
  data() {
    return {
      isModalVisible: false,
      };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  
}
</script>

<style>
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0e0224;
  margin-top: 60px;
}
</style>
