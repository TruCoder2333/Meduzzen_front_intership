import axiosInstance from '@/utils/axiosInstance';

const state = {
  userList: [],
  userDetails: {},
};

const mutations = {
  setUserList(state, userList) {
    state.userList = userList;
  },
  setUserDetails(state, userDetails) {
    state.userDetails = userDetails;
  },
  clearUserDetails(state) {
    state.userDetails = {};
  },
};

const actions = {

  async fetchUserList({ commit }) {
    try {
      const { data } = await axiosInstance.get('/users/');
      commit('setUserList', data);
      
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  },

  async fetchUserDetails({ commit }, userId) {
    try {
      const response = await axiosInstance.get(`/users/${userId}/`);

      commit('setUserDetails', response.data);

    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  },

  async updateUser({ commit }, userData) {
    try {
      const response = await axiosInstance.put(`/users/${userData.id}/`, userData);

      const updatedUser = response.data;

      commit('setUserDetails', updatedUser);

      return updatedUser; // Return the updated user data
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Propagate the error to handle it in your component
    }
  },

  

  async deleteProfile({ commit }, userId) {
      try {
        await axiosInstance.delete(`/users/${userId}/`);

        commit('clearUserDetails');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    },

    async uploadUserAvatar({ commit }, { userId, avatar }) {
      try {
        const formData = new FormData();
        formData.append('avatar', avatar);
  
        await axiosInstance.post(`/users/${userId}/upload_avatar/`, formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        });
        
        const response = await axiosInstance.get(`/users/${userId}/`);
        commit('setUserDetails', response.data);
        return 'Avatar updated successfully';
      } catch (error) {
        console.error('Error updating avatar:', error);
        throw error; 
      }
    },

};

const getters = {
  getUserList : (state) => state.userList,
  getUserDetails : (state) => state.userDetails
};

export default  {
  state,
  mutations,
  actions,
  getters,
};