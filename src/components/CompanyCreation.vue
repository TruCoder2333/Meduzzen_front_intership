<template>
    <div>
      <form @submit.prevent="createCompany">
        <label for="name">Name:</label>
        <input v-model="companyData.name" required>
  
        <label for="description">Description:</label>
        <textarea v-model="companyData.description" required></textarea>
  
        <button type="submit">Create Company</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';


  export default {
    data() {
      return {
        companyData: {
          name: '',
          description: '',
        },
      };
    },
    methods: {
      ...mapActions(['fetchCompanies', 'createCompany']),

      createCompany() {
        this.$store.dispatch('createCompany', this.companyData)
          .then(() => {
            this.fetchCompanies();
          })
          .catch((error) => {
            console.error('Error creating company:', error);
          });
      },
    },
  };
  </script>
  