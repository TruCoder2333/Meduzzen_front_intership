<template>
    <button @click="showAnalytics = !showAnalytics">{{ $t('getUserAnalytics') }}</button>
      
    <div v-if="showAnalytics">
    <input v-model="userId" placeholder="User ID">
    <button @click="fetchUserAverageScores">{{ $t('fetchData') }}</button>
  
    <div v-if="averageScores.length > 0">
        <canvas id="userAverageScoreChart"></canvas>
    </div>
    </div>
</template>
  

<script>
import axiosInstance from '@/utils/axiosInstance';
import Chart from 'chart.js/auto';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showAnalytics: false,
      userId: '',
      averageScores: [],
      chart: null,
    };
  },

  computed: {
    ...mapGetters(['getCompanyDetails']),
  },

  methods: {
    async fetchUserAverageScores() {
      if (!this.userId) return;

      try {
        const response = await axiosInstance.get(`/company/${this.getCompanyDetails.id}/average_score/?user_id=${this.userId}`);
        this.averageScores = response.data.quiz_results;
        this.renderChart();
      } catch (error) {
        console.error('Error fetching user average scores:', error);
      }
    },

    renderChart() {
      const ctx = document.getElementById('userAverageScoreChart').getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.averageScores.map(item => new Date(item.timestamp).toLocaleDateString()),
          datasets: [{
            label: 'User Scores',
            data: this.averageScores.map(item => item.score),
          }]
        },
      });
    },
  },
};
</script>


  