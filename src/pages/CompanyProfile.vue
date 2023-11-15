<template>
  <h1>{{ $t('companyProfile') }}</h1>
  <router-link to="/">{{ $t('home_link') }}</router-link>
  <input v-model="id" placeholder="Company ID">
  <button @click="findId">{{ $t('findCompany') }}</button>  
      
  <div v-if="isCompanyOwner">
    <button 
      @click="toggleEditMode" 
      v-if="!editMode">
      {{ $t('editCompany') }}
    </button>

    <button 
      @click="showInvitationSection = !showInvitationSection">
      {{ $t('actions') }}
    </button>

    <div v-if="showInvitationSection">
      <button 
        @click="showSendInvitationForm = true">
        {{ $t('sendInvitation') }}
      </button>
                  
      <div v-if="showSendInvitationForm">
        <input v-model="userId" placeholder="Enter User ID">
        <button @click="sendInvitation">{{ $t('invite') }}</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <button 
        @click="showRevokeInvitationForm = true">
        {{ $t('revokeInvitation') }}
      </button>

      <div v-if="showRevokeInvitationForm">
        <input v-model="userId" placeholder="Enter User ID">
        <button @click="revokeInvitation">{{ $t('revoke') }}</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <button @click="listInvitations">{{ $t('listInvitations') }}</button>

      <div v-if="showListInvitations">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <ul>
          <li v-for="user in invitedUsers" :key="user.id">
            {{ user.invited_user_id }} 
          </li>
        </ul>
        <button @click="showListInvitations = false">{{ $t('close') }}</button>
      </div>

      <button @click="listRequests">{{ $t('listRequests') }}</button>

      <div v-if="showListRequests">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <ul>
          <li v-for="user in userRequests" :key="user.id">
            {{ user.invited_user_id }} 
          </li>
        </ul>
        <button @click="showListRequests = false">{{ $t('close') }}</button>
      </div>

      <button 
        @click="showRemoveMemberForm = true">
        {{ $t('removeMember') }}
      </button>

      <div v-if="showRemoveMemberForm">
        <input v-model="userId" placeholder="Enter User ID">
        <button @click="requestAction">{{ $t('remove') }}</button>
        <ConfirmationModal
          :isVisible="showConfirmationModal"
          :message= "confirmationMessage"
          :onConfirm="removeMember"
          @update:isVisible="showConfirmationModal = $event">
        </ConfirmationModal>

        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <button 
        @click="showAcceptRequestForm = true">
        {{ $t('acceptRequest') }}
      </button>

      <div v-if="showAcceptRequestForm">
        <input v-model="userId" placeholder="Enter User ID">
        <button @click="acceptRequest">{{ $t('accept') }}</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <button 
        @click="showRejectRequestForm = true">
        {{ $t('rejectRequest') }}
      </button>

      <div v-if="showRejectRequestForm">
        <input v-model="userId" placeholder="Enter User ID">
        <button @click="rejectRequest">{{ $t('reject') }}</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <button @click="listMembers">{{ $t('listMembers') }}</button>

      <div v-if="showListMembers">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.username }} 
          </li>
        </ul>
        <button @click="showListMembers = false">{{ $t('close') }}</button>
      </div>

    </div>

  </div>
        
  <div v-if="editMode">
    <textarea v-model="additionalInfo" placeholder="Description"></textarea>
    <button @click="saveChanges" >{{ $t('save') }}</button>
    <button @click="deleteComp"  class="delete-button">{{ $t('deleteCompany') }}</button>
  </div>
  
  <div v-else>
    <p>{{ $t('name') }}: {{ getCompanyDetails.name }}</p>
    <p>{{ $t('additionalInfo') }}: {{ getCompanyDetails.description }}</p>
    <p>{{ $t('additionalInfo') }}: {{ getCompanyDetails.owner }}</p>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axiosInstance from '@/utils/axiosInstance';
import ConfirmationModal from '@/components/ConfirmationModal.vue'

export default {
  components: {
    ConfirmationModal,
  },  

  data() {
    return {
      id: '',
      editMode: false,
      showConfirmationModal: false,
      editedCompany: null,
      errorMessage: '',
      showSendInvitationForm: false,
      showInvitationSection: false, 
      showRevokeInvitationForm: false,
      showListInvitations: false,
      showListRequests: false,
      invitedUsers: [],
      userRequests: [],
      showRemoveMemberForm: false,
      showAcceptRequestForm: false,
      showRejectRequestForm: false,
      users: [],
      showListMembers: false
    };
  },

  computed: {
    ...mapGetters(['getCompanyDetails', 'getCurrentUser']),

    isCompanyOwner() {
        const currentUser = this.getCurrentUser.id; 
        const companyOwner = this.getCompanyDetails.owner; 
        return currentUser && companyOwner && currentUser === companyOwner;
    },

    confirmationMessage() {
      return this.$t('confirm');
    },
  },
  
  methods: {
    ...mapActions(['fetchCompanyDetails', 'updateCompany', 'deleteCompany']),

    async findId() {
      const id = this.id;
      this.fetchCompanyDetails(id);
    },

    requestAction() {
      this.showConfirmationModal = true;
    },

    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.editedCompany = this.getCompanyDetails;
       
      }
    },

    saveChanges() {
      this.editedCompany.description = this.additionalInfo;    
      this.updateCompany(this.editedCompany);
      this.editMode = false;
    },

    async deleteComp() {
      this.deleteCompany(this.getCompanyDetails.id);
      this.editMode = false;
    },

    async sendInvitation() {
      try {
        const companyId = this.getCompanyDetails.id;
        await axiosInstance.post(`/company/${companyId}/send_invitation/`, { invited_user_id: this.userId });
        this.showSendInvitationForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error sending invitation:', error);
      }
    },

    async revokeInvitation() {
      try {
        const companyId = this.getCompanyDetails.id;
        await axiosInstance.post(`/company/${companyId}/revoke_invitation/`, { invited_user_id: this.userId });
        this.showRevokeInvitationForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error sending invitation:', error);
      }
    },

    async acceptRequest() {
      try {
        const companyId = this.getCompanyDetails.id;
        await axiosInstance.post(`/company/${companyId}/accept_request/`, { req_user_id: this.userId });
        this.showAcceptRequestForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error sending invitation:', error);
      }
    },

    async rejectRequest() {
      try {
        const companyId = this.getCompanyDetails.id;
        await axiosInstance.post(`/company/${companyId}/reject_request/`, { req_user_id: this.userId });
        this.showRejectRequestForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
          console.error('Error sending invitation:', error);
      }
    },


    async listInvitations() {
      try {
        const companyId = this.getCompanyDetails.id;
        const response = await axiosInstance.get(`/company/${companyId}/list_invitations/`); 
        this.invitedUsers = response.data;
        this.showListInvitations = true;
      } catch (error) {
          console.error('Error fetching invites:', error);
        }
    },

    async listRequests() {
      try {
        const companyId = this.getCompanyDetails.id;
        const response = await axiosInstance.get(`/company/${companyId}/list_requests/`); 
        this.userRequests = response.data;
        this.showListRequests = true;
      } catch (error) {
          console.error('Error fetching requests:', error);
        }
    },
    
    async removeMember() {
      try {
        const companyId = this.getCompanyDetails.id;
        await axiosInstance.post(`/company/${companyId}/remove_member/`, { user_id: this.userId });
        this.showRemoveMemberForm = false;
        this.showInvitationSection = false;
        } catch (error) {
        
        if (error.response && error.response.status === 404) {
          this.errorMessage = this.$t('notFoundError');
        } else {
          this.errorMessage = this.$t('processError');
        }
        console.error('Error during deletion:', error);
      }
    },

    async listMembers() {
      try {
        const companyId = this.getCompanyDetails.id;
        const response = await axiosInstance.get(`/company/${companyId}/list_members/`); 
        this.users = response.data;
        this.showListMembers = true;
      } catch (error) {
          console.error('Error fetching users:', error);
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