<template>
    <div>
        <h1>{{ $t('allUsers') }}</h1>
        <router-link to="/">{{ $t('home_link') }}</router-link>
        <ul>
        <li v-for="CustomUser in userListResponse" :key="CustomUser.id">{{ CustomUser.username }}</li>
        </ul>

    </div>
</template>

<script>
import axiosInstance from '/app/src/utils/axiosInstance';

export default{
    data() {
        return {
        userListResponse: [],
        };
    },

    mounted() {
        axiosInstance.get('/users/')
        .then(response => {
        this.userListResponse = response.data;
        })
        .catch(error => {
        console.error('Error fetching user list:', error);
        });
    }
}

</script>