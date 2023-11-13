<template>
    <div>
        <h1>{{ $t('companyProfile') }}</h1>
        <router-link to="/">{{ $t('home_link') }}</router-link>
        <input v-model="id" placeholder="Company ID">
        <button @click="findId">Find Company</button>
        <button @click="toggleEditMode" 
                v-if="!editMode && isCompanyOwner">
                Edit Company
            </button>
      
        <div v-if="editMode">
            <textarea v-model="additionalInfo" placeholder="Description"></textarea>
            <button @click="saveChanges" >{{ $t('save') }}</button>
            <button @click="deleteComp"  class="delete-button"> Delete company</button>
        </div>
        <div v-else>
            <p>{{ $t('name') }}: {{ getCompanyDetails.name }}</p>
            <p>{{ $t('additionalInfo') }}: {{ getCompanyDetails.description }}</p>
            <p>{{ $t('additionalInfo') }}: {{ getCompanyDetails.owner }}</p>
        </div>

       


    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
    
  data() {
    return {
      id: '',
      editMode: false,
      editedCompany: null,

    };
  },

  computed: {
    ...mapGetters(['getCompanyDetails', 'getCurrentUser']),

    isCompanyOwner() {
        const currentUser = this.getCurrentUser.id; 
        const companyOwner = this.getCompanyDetails.owner; 
        return currentUser && companyOwner && currentUser === companyOwner;
    },
  },
  
  methods: {
    ...mapActions(['fetchCompanyDetails', 'updateCompany', 'deleteCompany']),

    async findId() {
      const id = this.id;
      this.fetchCompanyDetails(id);
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
    }
    
  },
  
};
</script>

<style>
.delete-button {
  background-color: red;  
}
</style>