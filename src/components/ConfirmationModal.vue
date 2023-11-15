<template>
    <div v-if="isVisible" class="modal">
      <p>{{ message }}</p>
      <button @click="confirm">Yes</button>
      <button @click="cancel">No</button>
    </div>
</template>
  
<script>
  export default {
    props: ['isVisible', 'message', 'onConfirm'],
    methods: {
      confirm() {
        this.onConfirm();
        this.close();
      },
      cancel() {
        this.close();
      },
      close() {
        this.$emit('update:isVisible', false);
      }
    }
  };
</script>
  
<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 30%;
    height: 30%;
    overflow: auto;
    padding-top: 60px;
  }

  .modal-content {
    background-color: #920000;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
</style>
  