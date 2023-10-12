<template>
    <nav>
        <router-link v-for="link in links" :key="link" :to="`/${snakeCase(link)}`" class="nav-link">{{ link }}</router-link>
    </nav>
</template>

<script>

export default {
    name: 'NavBar',
    data() {
    return {
      links: ['About',
             'Sign Up', 
             'Sign In', 
             'All Users', 
             'User Profile', 
             'Company Profile', 
             'All Companies'],
      snakeCase: null
    };
  },
    created() {
        import('lodash/snakeCase').then(module => {
        this.snakeCase = module.default;
    });
  }
};
</script>

<style scoped>

.nav-link {
  margin-right: 10px; 
  display: flex;
}

</style>
