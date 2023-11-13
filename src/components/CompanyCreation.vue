<template>
    <div>
      <form @submit.prevent="createCompany">
        <label for="name">{{ $t('name') }}:</label>
        <input v-model="companyData.name" required>
  
        <label for="description">{{ $t('description') }}:</label>
        <textarea v-model="companyData.description" required></textarea>
  
        <button type="submit">{{ $t('createCompany') }}</button>
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
  