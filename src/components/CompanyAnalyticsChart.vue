<template>
    <button @click="handleButtonClick">{{ $t('getCompanyAnalytics') }}</button>
    <div v-if="showAnalytics && chartData.length > 0">
      <canvas ref="chart"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
import axiosInstance from '@/utils/axiosInstance';
import { mapGetters } from 'vuex';

export default {
    data() {
      return {
        showAnalytics: false,
        chart: null,
        chartData: []
      };
    },

    computed: {
    ...mapGetters(['getCompanyDetails']),
    },

    methods: {
      handleButtonClick() {
        this.showAnalytics = true;  
        this.fetchChartData();  
      },

      async fetchChartData() {
        try {
          const response = await axiosInstance.get(`/company/${this.getCompanyDetails.id}/get_company_average_scores_over_time/`);
          this.chartData = response.data;
          this.$nextTick(() => {
            this.renderChart();
          });
        } catch (error) {
          console.error('Error fetching chart data:', error);
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
  