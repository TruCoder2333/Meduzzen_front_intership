<template>
  <HelloWorld msg="Hello mentor"/>
  <button @click="openModal">Open Modal</button>
  <ModalWindow :visible="isModalVisible" @close="closeModal">
      <h2>Modal Content</h2>
      <p>This is the content of the modal.</p>
  </ModalWindow>
</template>

<script>
import HelloWorld from '/app/src/components/HelloWorld.vue'
import ModalWindow from '/app/src/components/ModalWindow.vue'

export default {
  name: 'HomePage',
  components: {
    HelloWorld,
    ModalWindow,
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    openModal() {
      console.log('Opening modal...'); 
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
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
