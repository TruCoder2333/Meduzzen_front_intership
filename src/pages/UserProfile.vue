<template>
    <div>
      <h1>{{ $t('userProfile') }}</h1>

      <router-link to="/">{{ $t('home_link') }}</router-link>
      <input v-model="id" placeholder="User ID">
      <button @click="findId">{{ $t('findUser') }}</button>
      <button @click="toggleEditMode" v-if="!editMode">{{ $t('editUser') }}</button>
      
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
import ModalWindow from '/app/src/components/ModalWindow.vue'


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
    };
  },

  computed: {
    ...mapGetters(['getUserDetails', 'username']),
  },
  
  methods: {
    ...mapActions(['fetchUserDetails', 'deleteProfile', 'updateUser', 'uploadUserAvatar']),

    async findId() {
      const id = this.id;
      this.fetchUserDetails(id);
    },

    async deleteUser() {
      if (this.getUserDetails.username != this.username) {
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
  },
  
};
</script>

<style>
.delete-button {
  background-color: red;  
}
</style>