<template>
    <div v-if="quiz">
      <h2>{{ quiz.title }}</h2>
      <div v-for="(question, index) in quiz.questions" :key="question.id">
        <p>{{ question.text }}</p>
        <ul>
          <li v-for="answer in question.answers" :key="answer.id">
            <input type="radio" :name="`question-${index}`" :value="answer.id" v-model="question.userResponse">
            {{ answer.text }}
          </li>
        </ul>
      </div>
      <button @click="submitQuiz">{{ $t('submit') }}</button>
    </div>
 </template>
  

<script>
import axiosInstance from '@/utils/axiosInstance';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      quiz: null,
      quizAttempt: null,
    };
  },

  computed: {
    ...mapGetters(['getCompanyDetails', 'getCurrentUser']),
  },
 
  methods: {
    async fetchQuizDetails() {
      try {
        const response = await axiosInstance.get(`/quizzes/${this.$route.params.quizId}/`);
        this.quiz = response.data;
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    },
    async startQuizAttempt() {
      try {
        const quizId = this.$route.params.quizId;
        const userId = this.getCurrentUser.id;
        const response = await axiosInstance.post(`/quizzes/${quizId}/start_attempt/`, { user: userId, quiz: quizId });
        this.quizAttempt = response.data;
      } catch (error) {
        console.error('Error starting quiz attempt:', error);
      }
    },

    submitQuiz() {
        const attempt_id = this.quizAttempt.quiz_attempt_id;
        const submissionData = this.quiz.questions.map(question => ({
        quiz_attempt: attempt_id,
        question: question.id,
        chosen_answer: question.userResponse
        }));
        console.log("the answers are:", submissionData)
        axiosInstance.post(`/quizzes/${this.quiz.id}/submit_answers/`, submissionData)
        .catch(error => {
            console.error('Error submitting answers:', error);
        });
        this.$router.push('/company_profile/');

    },
  },

  async created() {
    await this.fetchQuizDetails();
    await this.startQuizAttempt();
  },
}
</script>