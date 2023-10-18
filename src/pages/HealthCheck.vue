<template>
    <pre>
        {{ healthCheckResponse }}
    </pre>
</template>



<script>
import axiosInstance from '/app/src/utils/axiosInstance';

export default{
    data() {
        return {
        healthCheckResponse: null,
        };
    },

    mounted() {
        axiosInstance.get('/')
        .then(response => {
        this.healthCheckResponse = response.data;
        })
        .catch(error => {
        console.error('Error fetching health check:', error);
        });
    }
}
</script>