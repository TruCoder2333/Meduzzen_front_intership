<template>
    <nav>
        <router-link
         v-for = "link in links" 
         :key = "link" 
         :to = "`/${snakeCase(link)}`" 
         class="nav-link">
         
         {{ $t(link) }}
        
        </router-link>
    </nav>
</template>

<script>

export default {
  name: 'NavBar',
  data() {
    return {
      links: ['about',
             'signUp', 
             'signIn', 
             'allUsers', 
             'userProfile', 
             'companyProfile', 
             'allCompanies'],
      snakeCase: null,
    };
  },
  watch: {
    selectedLanguage(newLang) {
      this.$i18n.locale = newLang;
    },
  },

  created() {
        import("lodash/snakeCase").then(module => {
        this.snakeCase = module.default;
    });
  },
  
};
</script>

<style scoped>

.nav-link {
  margin-right: 10px; 
  display: flex;
}

</style>
