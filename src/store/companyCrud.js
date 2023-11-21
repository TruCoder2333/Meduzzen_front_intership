
import axiosInstance from '@/utils/axiosInstance';

const state = {
  companies: [],
  companyDetails: {},
};

const mutations = {
  setCompanies(state, companies) {
    state.companies = companies;
  },

  setCompanyDetails(state, companyDetails) {
    state.companyDetails = companyDetails;
  },

  clearCompanyDetails(state) {
    state.companyDetails = {};
  },

  addCompany(state, newCompany) {
    console.log(state.companies)
    state.companies.push(newCompany);
  },
  updateCompany(state, updatedCompany) {
    const index = state.companies.findIndex((c) => c.id === updatedCompany.id);
    if (index !== -1) {
      state.companies.splice(index, 1, updatedCompany);
    }
  },
  removeCompany(state, companyId) {
    state.companies = state.companies.filter((c) => c.id !== companyId);
  },
};

const actions = {
  async fetchCompanies({ commit }) {
    try {
      const { data } = await axiosInstance.get('/company/');
      commit('setCompanies', data.results);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  },

  async fetchCompanyDetails({ commit }, companyId) {
    try {
      const { data } = await axiosInstance.get(`/company/${companyId}/`);
      commit('setCompanyDetails', data);
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  },

  async createCompany({ commit }, newCompany) {
    try {
      const response = await axiosInstance.post('/company/', newCompany);
      commit('addCompany', response.data);
    } catch (error) {
      console.error('Error creating company:', error);
    }
  },

  async updateCompany({ commit }, updatedCompany) {
    try {
      const response = await axiosInstance.put(`/company/${updatedCompany.id}/`, updatedCompany);
      commit('updateCompany', response.data);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  },

  async deleteCompany({ commit }, companyId) {
    try {
      await axiosInstance.delete(`/company/${companyId}/`);
      commit('removeCompany', companyId);
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  },
};

const getters = {
  getCompanies: (state) => state.companies,
  getCompanyDetails: (state) => state.companyDetails
};

export default {
  state,
  mutations,
  actions,
  getters,
};
