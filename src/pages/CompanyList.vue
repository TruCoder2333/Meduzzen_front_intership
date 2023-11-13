<template>
    <div>
        <h1>{{ $t('allCompanies') }}</h1>

        <router-link to="/">{{ $t('home_link') }}</router-link>
        <ul>
            <li v-for="company in getCompanies" :key="company.id">
                {{ company.name }} - {{ company.description }}
            </li>
        </ul>
        <company-creation @company-created="fetchCompanies" />
    </div>
</template>

<script>
import CompanyCreation from '@/components/CompanyCreation.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    CompanyCreation,
  },
  computed: {
    ...mapGetters(['getCompanies']),
  },

  methods: {
    ...mapActions(['fetchCompanies', 'createCompany']),
  },

  created() {
    this.fetchCompanies(); 
  },
};
</script>