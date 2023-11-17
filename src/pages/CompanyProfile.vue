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
      <InviteAction
      v-for="action in actions"
      :key="action.actionName"
      :actionName="action.actionName"
      :idName="action.idName"
      :byWhom="'company'"
      :requireConfirmation="action.requireConfirmation"
      />
    
      <PaginationComponent
      v-for="list in lists"
      :key="list.actionName"
      :actionName="list.actionName"  
      :idName="list.idName"
      :byWhom="'company'"
      />

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
import InviteAction from '@/components/InviteAction.vue'
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  components: {
    InviteAction,
    PaginationComponent
  },  

  data() {
    return {
      id: '',
      editMode: false,
      showInvitationSection: false,
      showConfirmationModal: false,
      confirmationContext: '',
      editedCompany: null,
      errorMessage: '',
      actions: [
        { actionName: 'sendInvitation', idName: 'invited_user_id' },
        { actionName: 'revokeInvitation', idName: 'invited_user_id' },
        { actionName: 'removeMember', idName: 'user_id', requireConfirmation: true  },
        { actionName: 'acceptRequest', idName: 'req_user_id' },
        { actionName: 'rejectRequest', idName: 'req_user_id' },
        { actionName: 'appointAdministrator', idName: 'user_id', requireConfirmation: true },
        { actionName: 'removeAdministrator', idName: 'user_id', requireConfirmation: true }
      ],
      lists: [
        { actionName: 'listInvitations', idName: 'invited_user_id' },
        { actionName: 'listRequests', idName: 'invited_user_id' },
        { actionName: 'listMembers', idName: 'username' },
        { actionName: 'listAdministrators', idName: 'username' },
      ]

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
      switch (this.confirmationContext) {
        case 'removeUser':
          return this.$t('confirmUserRemove');
        case 'appointAdmin':
          return this.$t('confirmAppointAdmin');
        case 'removeAdmin':
          return this.$t('confirmRemoveAdmin');
        default:
        return ''; 
      }
    },
  },
  
  methods: {
    ...mapActions(['fetchCompanyDetails', 'updateCompany', 'deleteCompany']),

    async findId() {
      const id = this.id;
      this.fetchCompanyDetails(id);
    },

    toggleVisibility(toggleName) {
      this[toggleName] = !this[toggleName];
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
    
    
  }
};
</script>

<style>
.delete-button {
  background-color: red;  
}
</style>