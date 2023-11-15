<template>
    <div>
      <h1>{{ $t('userProfile') }}</h1>

      <router-link to="/">{{ $t('home_link') }}</router-link>
      <input v-model="id" placeholder="User ID">
      <button @click="findId">{{ $t('findUser') }}</button>
      <div v-if="isCurrentUser">
        <button @click="toggleEditMode" v-if="!editMode">{{ $t('editUser') }}</button>
      
        <button 
          @click="showSendRequestForm = true">
          {{ $t('sendRequest') }}
        </button>

        <div v-if="showSendRequestForm">
          <input v-model="companyId" placeholder="Enter Company ID">
          <button @click="sendRequest">{{ $t('request') }}</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <button 
          @click="showRevokeRequestForm = true">
          {{ $t('revokeRequest') }}
        </button>

        <div v-if="showRevokeRequestForm">
          <input v-model="companyId" placeholder="Enter Company ID">
          <button @click="revokeRequest">{{ $t('revoke') }}</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <button 
          @click="showAcceptInvitationForm = true">
          {{ $t('acceptInvitation') }}
        </button>

        <div v-if="showAcceptInvitationForm">
          <input v-model="companyId" placeholder="Enter Company ID">
          <button @click="acceptInvitation">{{ $t('accept') }}</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <button 
          @click="showDeclineInvitationForm = true">
          {{ $t('declineInvitation') }}
        </button>

        <div v-if="showDeclineInvitationForm">
          <input v-model="companyId" placeholder="Enter Company ID">
          <button @click="declineInvitation">{{ $t('reject') }}</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <button @click="listRequests">{{ $t('listRequests') }}</button>

        <div v-if="showListRequests">
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <ul>
            <li v-for="company in userRequests" :key="company.id">
              {{ company.company_id }} 
            </li>
          </ul>
          <button @click="showListRequests = false">{{ $t('close') }}</button>
        </div>

        <button @click="listInvitations">{{ $t('listInvitations') }}</button>

        <div v-if="showListInvitations">
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <ul>
            <li v-for="company in invitations" :key="company.id">
              {{ company.company_id }} 
            </li>
          </ul>
          <button @click="showListInvitations = false">{{ $t('close') }}</button>
        </div>

        <button 
          @click="showLeaveCompanyForm = true">
          {{ $t('leaveCompany') }}
        </button>

        <div v-if="showLeaveCompanyForm">
          <input v-model="companyId" placeholder="Enter Company ID">
          <button @click="leaveCompany">{{ $t('accept') }}</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

      </div>

      <div v-if="editMode">
        <textarea v-model="additionalInfo" placeholder="Additional Information"></textarea>
        <input type="file" ref="avatarInput" @change="handleAvatarChange" />
        <button @click="updateAvatar">{{ $t('updateAvatar') }}</button>
        <button @click="saveChanges" >{{ $t('save') }}</button>
        <button @click="deleteUser"  class="delete-button">{{ $t('deleteUser') }}</button>
        <p>{{ $t('name') }}: {{ editedUser }}</p>
      </div>
      <div v-else>
        <p>{{ $t('name') }}: {{ getUserDetails.username }}</p>
        <p>Email: {{ getUserDetails.email }}</p>
        <p>{{ $t('additionalInfo') }}: {{ getUserDetails.additionalInfo }}</p>
      </div>
          
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
import axiosInstance from '@/utils/axiosInstance';

export default {
  components: {
    ModalWindow,
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
      showSendRequestForm: false,
      showRevokeRequestForm: false,
      showAcceptInvitationForm: false,
      showDeclineInvitationForm: false,
      showListRequests: false,
      userRequests: [],
      showListInvitations: false,
      invitations: [],
      showLeaveCompanyForm: false
    };
  },

  computed: {
    ...mapGetters(['getUserDetails', 'getCurrentUser']),

    isCurrentUser() {
        const currentUser = this.getCurrentUser.id; 
        const foundUser = this.getUserDetails.id; 
        return currentUser && foundUser && currentUser === foundUser;
    },
  },
  
  methods: {
    ...mapActions(['fetchUserDetails', 'deleteProfile', 'updateUser', 'uploadUserAvatar']),

    async findId() {
      const id = this.id;
      this.fetchUserDetails(id);
    },
    
    async deleteUser() {
      if (this.getUserDetails.username != this.getCurrentUser.username) {
        this.isModalVisible = true;
        this.errorMessage = "You cannot delete other users profile"
      }
      else {this.deleteProfile(this.getUserDetails.id)
            this.editMode = false;}
    },

    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.editedUser = this.getUserDetails
       
      }
    },

    handleAvatarChange() {
      this.selectedAvatar = this.$refs.avatarInput.files[0];
    },

    updateAvatar() {
      if (this.selectedAvatar) {
        this.uploadUserAvatar({ userId: this.getUserDetails.id, avatar: this.selectedAvatar })
          .then(() => {
            this.selectedAvatar = null;
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

    async sendRequest() {
      try {
        const userId = this.getCurrentUser.id;
        await axiosInstance.post(`/users/${userId}/send_request/`, { req_company_id: this.companyId });
        this.showSendRequestForm = false;
        this.showRequestSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error sending request:', error);
      }
    },

    async revokeRequest() {
      try {
        const userId = this.getCurrentUser.id;       
        await axiosInstance.post(`/users/${userId}/revoke_request/`, { req_company_id: this.companyId });
        this.showRevokeRequestForm = false;
        this.showRequestSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error sending request:', error);
      }
    },

    async acceptInvitation() {
      try {
        const userId = this.getCurrentUser.id;       
        await axiosInstance.post(`/users/${userId}/accept_invitation/`, { company_id: this.companyId });
        this.showAcceptInvitationForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error acceptinging invitation:', error);
      }
    },

    async declineInvitation() {
      try {
        const userId = this.getCurrentUser.id;       
        await axiosInstance.post(`/users/${userId}/decline_invitation/`, { company_id: this.companyId });
        this.showDeclineInvitationForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error acceptinging invitation:', error);
      }
    },

    async listRequests() {
      try {
        const userId = this.getCurrentUser.id;
        const response = await axiosInstance.get(`/users/${userId}/list_requests/`); 
        this.userRequests = response.data;
        this.showListRequests = true;
      } catch (error) {
          console.error('Error fetching requests:', error);
        }
    },

    async listInvitations() {
      try {
        const userId = this.getCurrentUser.id;
        const response = await axiosInstance.get(`/users/${userId}/list_invites/`); 
        this.invitations = response.data;
        this.showListInvitations = true;
      } catch (error) {
          console.error('Error fetching invites:', error);
        }
    },

    async leaveCompany() {
      try {
        const userId = this.getCurrentUser.id;
        await axiosInstance.post(`/users/${userId}/leave_company/`, { company_id: this.companyId });
        this.showLeaveCompanyForm = false;
        this.showRequestSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error leaving:', error);
      }
    },
  },
  
};
</script>

<style>
.delete-button {
  background-color: red;  
}
</style>