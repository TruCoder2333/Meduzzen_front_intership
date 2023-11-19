<template>
    <h1>{{ $t('userProfile') }}</h1>

    <router-link to="/">{{ $t('home_link') }}</router-link>
    <button @click="toggleEditMode" v-if="!editMode">{{ $t('editUser') }}</button>
        
    <InviteAction
    v-for="action in actions"
    :key="action.actionName"
    :actionName="action.actionName"
    :idName="action.idName"
    :byWhom="'users'"
    :requireConfirmation="action.requireConfirmation"
    />

    <PaginationComponent
    v-for="list in lists"
    :key="list.actionName"
    :actionName="list.actionName"  
    :idNames="list.idNames"
    :byWhom="'users'"
    />

    <div v-if="editMode">
        <textarea v-model="additionalInfo" placeholder="Additional Information"></textarea>
        <input type="file" ref="avatarInput" @change="handleAvatarChange" />
        <button @click="updateAvatar">{{ $t('updateAvatar') }}</button>
        <button @click="saveChanges" >{{ $t('save') }}</button>
        <button @click="deleteUser"  class="delete-button">{{ $t('deleteUser') }}</button>
        <p>{{ $t('name') }}: {{ editedUser }}</p>
    </div>
    <div v-else>
        <p>{{ $t('name') }}: {{ getCurrentUser.username }}</p>
        <p>Email: {{ getCurrentUser.email }}</p>
        <p>{{ $t('additionalInfo') }}: {{ getCurrentUser.additionalInfo }}</p>
        <RatingsComponent :rating="averageOverallScore" :max="5" />
        <UserByQuizAnalyticsChart />
        <button @click="downloadCsv">{{ $t('getResultsCSV') }}</button>
        <button @click="downloadJson">{{ $t('getResultsJSON') }}</button>


    </div>
          
    <ModalWindow 
    ref="modalWindow" 
    :visible="isModalVisible" 
    @close="closeModal">
        <p>{{ errorMessage }}</p>
    </ModalWindow>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalWindow from '/app/src/components/ModalWindow.vue';
import InviteAction from '@/components/InviteAction.vue'
import PaginationComponent from '@/components/PaginationComponent.vue';
import RatingsComponent from '@/components/RatingsComponent.vue';
import axiosInstance from '@/utils/axiosInstance';
import UserByQuizAnalyticsChart from '@/components/UserByQuizAnalyticsChart.vue';

export default {
  components: {
    ModalWindow,
    InviteAction,
    PaginationComponent,
    RatingsComponent,
    UserByQuizAnalyticsChart,
},
  
  data() {
    return {
      id: '',
      errorMessage: '',
      isModalVisible: false,
      editMode: false,
      editedUser: null,
      additionalInfo: '',
      selectedAvatar: null,
      showRequestSection: false,
      actions: [
        { actionName: 'sendRequest', idName: 'req_company_id' },
        { actionName: 'revokeRequest', idName: 'req_company_id' },
        { actionName: 'leaveCompany', idName: 'company_id', requireConfirmation: true },
        { actionName: 'acceptInvitation', idName: 'company_id' },
        { actionName: 'declineInvitation', idName: 'company_id' },
      ],
      lists: [
        { actionName: 'listInvites', idNames: ['company_id'] },
        { actionName: 'listRequests', idNames: ['company_id'] },
        { actionName: 'listCompanies', idNames: ['name'] },
        { actionName: 'getLastPassedQuizzes', idNames: ['quiz_title', 'completion_time'] },

      ],
      averageOverallScore: 0
    };
  },

  computed: {
    ...mapGetters(['getCurrentUser']),

    confirmationMessage() {
      return this.$t('confirmCompanyLeave');
    },
  },
  
  methods: {
    ...mapActions([ 'deleteProfile', 'updateUser', 'uploadUserAvatar']),
    
    requestAction() {
      this.showConfirmationModal = true;
    },

    async deleteUser() {
        this.deleteProfile(this.getCurrentUser.id)
        this.editMode = false;
    },

    toggleEditMode() {
        this.editMode = !this.editMode;
        if (this.editMode) {
            this.editedUser = this.getCurrentUser
         }
    },

    handleAvatarChange() {
      this.selectedAvatar = this.$refs.avatarInput.files[0];
    },

    updateAvatar() {
      if (this.selectedAvatar) {
        this.uploadUserAvatar({ userId: this.getCurrentUser.id, avatar: this.selectedAvatar })
          .then(() => { this.selectedAvatar = null;
            this.editMode = false;
          })
          .catch((error) => {
            console.error('Error updating avatar:', error);
          });
      }
    },

    saveChanges() {
      this.editedUser.additional_info = this.additionalInfo    
      this.updateUser(this.editedUser);
      this.editMode = false;
    },

    openModal() {
      this.isModalVisible = true;
    },
    
    closeModal() {
      this.isModalVisible = false;
    },

    async fetchAverageScore() {
      try {
        const response = await axiosInstance.get(`/users/${this.getCurrentUser.id}/average-score-all-companies/`);
        this.averageOverallScore = response.data.average_score_all_companies;
      } catch (error) {
        console.error('Error fetching average score:', error);
      }
    },

    async downloadCsv() {
      try {
        const response = await axiosInstance.get('/quizzes/export/csv/', {
          responseType: 'blob' 
        });

      const file = new Blob([response.data], {type: 'text/csv'});

      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = 'quiz_results.csv'; 
      link.click();
      URL.revokeObjectURL(link.href); 
      } catch (error) {
        console.error('Error downloading CSV:', error);
      }
    },

    async downloadJson() {
      try {
        const response = await axiosInstance.get('/quizzes/export/json/', {
          responseType: 'blob' 
        });

      const file = new Blob([response.data], {type: 'application/json'});

      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = 'quiz_results.json'; // Name of the file to be downloaded
      link.click();
      URL.revokeObjectURL(link.href); // Clean up
      } catch (error) {
        console.error('Error downloading JSON:', error);
      }
    }
  },
  async created() {
    await this.fetchAverageScore();
  },
  
};
</script>

<style>
.delete-button {
  background-color: red;  
}
</style>