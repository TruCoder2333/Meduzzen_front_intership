<template>
    <div>
        <h1>{{ $t('allUsers') }}</h1>
        <router-link to="/">{{ $t('home_link') }}</router-link>
        <ul>
        <li v-for="user in getUserList.results" :key="user.id">{{ user.username }}</li>
      </ul>
  
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
 
  computed: {
    ...mapGetters(['getUserList']),
  },
  methods: {
    ...mapActions(['fetchUserList']),
  },
  created() {
    this.fetchUserList();
  },
};

</script>