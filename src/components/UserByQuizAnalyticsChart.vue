<template>
    <button @click="showQuizInput = !showQuizInput">{{ $t('getAnalyticsOnQuiz') }}</button>
    
    <div v-if="showQuizInput">
      <input v-model="quizId" placeholder="Enter Quiz ID" />
      <button @click="fetchQuizData">{{ $t('showChart') }}</button>
    </div>
  
    <div v-if="chartData.length > 0">
      <canvas ref="chart"></canvas>
    </div>
  
</template>

<script>
import Chart from 'chart.js/auto';
import axiosInstance from '@/utils/axiosInstance';

export default {
  data() {
    return {
      showQuizInput: false,
      quizId: '',
      chartData: [],
      chart: null,
    };
  },
  methods: {
    async fetchQuizData() {
      try {
        const response = await axiosInstance.get(`/quizzes/${this.quizId}/get_average_scores_over_time/`);
        this.chartData = response.data;
        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.map(item => item.date),
          datasets: [{
            label: 'Average Score',
            data: this.chartData.map(item => item.average_score),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

  