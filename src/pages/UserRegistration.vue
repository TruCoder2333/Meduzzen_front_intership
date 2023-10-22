<template>
    <div>
        <h1>{{ $t('signUp') }}</h1>

        <router-link to="/">{{ $t('home_link') }}</router-link>
        <input v-model="email" placeholder="Email">
        <input v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <input type="password" v-model="passwordConfirm" placeholder="Confirm Password">
        <button @click="signUp">Sign Up</button>

    </div>
    <ModalWindow 
    ref="modalWindow" 
    :visible="isModalVisible" 
    @close="closeModal">
        <p>{{ errorMessage }}</p>
    </ModalWindow>
</template>

<script>
import axiosInstance from '/app/src/utils/axiosInstance';
import ModalWindow from '/app/src/components/ModalWindow.vue'
import { mapActions } from 'vuex';

export default {
    components: {
        ModalWindow,
    },

    data() {
      return {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        errorMessage:'',
        isModalVisible: false,
      };
    },
    methods: {
      ...mapActions(['authenticate']),
      async signUp() {
        if (!this.validate()) {
          this.isModalVisible = true;
          }

            try {
                await axiosInstance.post('/auth/register/', {
                  email: this.email,
                  username: this.username,
                  password: this.password,
                  });
              

                const getToken = await axiosInstance.post('/auth/token/create/', {
                username: this.username,
                password: this.password,
                })
                const token = getToken.data.token;   
                const username = this.username;
                const email = this.email;

                this.authenticate({username, email, token}); 
                this.$router.push({ path: '/' });


        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.status);
                console.error('Error Data:', error.response.data);
            } else if (error.request) {
                console.error('No Response Received');
            } else {
                console.error('Error Message:', error.message);
            }
        }
    },
    validate() {
      
      if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        this.errorMessage = 'Invalid email format.';
        return false;
      }

      if (this.password !== this.passwordConfirm) {
        this.errorMessage = 'Passwords do not match.';
        return false;
      }

      return true; 
    },

    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

   
  },
};

</script>