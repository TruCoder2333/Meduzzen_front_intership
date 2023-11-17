<template>
    <div>
      <button @click="fetchUsers">{{ $t(actionName) }}</button>
  
      <div v-if="showList">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <ul>
          <li v-for="something in list" :key="something.id">
            {{ something[idName] }} 
          </li>
        </ul>
        <button @click="showList = false">{{ $t('close') }}</button>
      </div>
    </div>
  </template>
  
<script>
import axiosInstance from '@/utils/axiosInstance';
import { snakeCase } from 'lodash';
import { mapGetters } from 'vuex';

export default {
    props: {
        actionName: String,
        idName: String,
        byWhom: String,
    },

    data() {
      return {
        list: [],
        errorMessage: '',
        showList: false
      };
    },

    computed: {
    ...mapGetters(['getCompanyDetails', 'getCurrentUser']),

        apiUrl() {
            const actionNameSnakeCase = snakeCase(this.actionName);
            let id;
            
            if (this.byWhom === 'company') {
                id = this.getCompanyDetails.id;
            } else if (this.byWhom === 'users') {
                id = this.getCurrentUser.id;
            } else {
                console.error(`Unexpected byWhom value: ${this.byWhom}`);
                this.$emit('error', `Unexpected byWhom value: ${this.byWhom}`);

            }

            return `/${this.byWhom}/${id}/${actionNameSnakeCase}/`;
        },
    },

    methods: {
      async fetchUsers() {
        try {
            const response = await axiosInstance.get(this.apiUrl);
            this.list = response.data;
            this.showList = true;
        } catch (error) {
            this.errorMessage = 'Error fetching requests';
            console.error('Error fetching requests:', error);
        }
      }
    }
  };
  </script>
  
