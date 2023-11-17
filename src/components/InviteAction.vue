<template>
    <div>
        <button 
            @click="toggleVisibility('showForm')">
            {{ $t(actionName) }}
        </button>
        <div v-if="showForm">
        <input v-model="userId" placeholder="Enter ID" />
        <button @click="prePerformAction">{{ $t(actionName) }}</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <ConfirmationModal
        v-if="requireConfirmation"
        :isVisible="showConfirmationModal"
        :message="confirmationMessage"
        :onConfirm="performAction"
        @update:isVisible="showConfirmationModal = $event"
        />
    </div>
</template>
  
<script>
import axiosInstance from '@/utils/axiosInstance';
import { snakeCase } from 'lodash';
import { mapGetters } from 'vuex';
import ConfirmationModal from '@/components/ConfirmationModal.vue'

  export default {
    components: {
        ConfirmationModal
    },

    props: {
        actionName: String,
        idName: String,
        byWhom: String,
        requireConfirmation: {
            type: Boolean,
            default: false
        },
    },

    data() {
      return {
        userId: '',
        errorMessage: '',
        showForm: false,
        showConfirmationModal: false,
      };
    },
    computed: {
    ...mapGetters(['getCompanyDetails', 'getCurrentUser']),

        apiUrl() {        
            const actionNameSnakeCase = snakeCase(this.actionName);
            let id;
            
            switch (this.byWhom) {
            case 'company':
                id = this.getCompanyDetails.id;
                break;
            case 'users':
                id = this.getCurrentUser.id;
                break;
            default:
                this.$emit('error', `Unexpected byWhom value: ${this.byWhom}`);
                id = null; 
                break;
            }

            return id ? `/${this.byWhom}/${id}/${actionNameSnakeCase}/` : null;
        },

        confirmationMessage() {
            return this.$t('confirm');
        }
    },
    methods: {
        toggleVisibility(toggleName) {
            this[toggleName] = !this[toggleName];
        },

        async performAction() {
            try {
                const payload = { [this.idName]: this.userId };
                await axiosInstance.post(this.apiUrl, payload);
                console.log(`Url: ${this.apiUrl}`);

                this.toggleVisibility('showForm');
            } catch (error) {
            if (error.response && error.response.status === 404) {
                this.errorMessage = this.$t('notFoundError');
            } else {
                this.errorMessage = this.$t('processError');
            }
            console.error('Error performing action:', error);
            }
        },

        prePerformAction() {
            if (this.requireConfirmation) {
                this.showConfirmationModal = true;    
            } else {
                this.performAction();
                }
            },  
    }
  };
  </script>
  