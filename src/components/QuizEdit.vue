<template>
  <div class="modal" v-if="isVisible">
    <form @submit.prevent="submitQuizEdits" class="modal-content">
      <input v-model="quiz.title" :placeholder="$t('title')" required />
      <textarea v-model="quiz.description" :placeholder="$t('description')" required></textarea>
      <input v-model.number="quiz.frequency_in_days" type="number" :placeholder="$t('frequency_in_days')" min="1" required />

      <div v-for="(question, qIndex) in quiz.questions" :key="qIndex">
        <input v-model="question.text" :placeholder="$t('question_text')" required />

        <div v-for="(answer, aIndex) in question.answers" :key="aIndex">
          <input v-model="answer.text" :placeholder="$t('answer_text')" required />
          <input type="checkbox" v-model="answer.is_correct" /> {{ $t('is_correct') }}
        </div>

        <button @click.prevent="addAnswer(qIndex)">{{ $t('add_answer') }}</button>
      </div>

      <button @click.prevent="addQuestion">{{ $t('add_question') }}</button>
      <button type="submit">{{ $t('save') }}</button>
      <button @click="closeModal">{{ $t('cancel') }}</button>
    </form>
  </div>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance';

export default {
  props: {
    isVisible: Boolean,
    initialQuizData: Object
  },
  data() {
    return {
      quiz: { ...this.initialQuizData } // Clone the initial data
    };
  },
  methods: {
    addQuestion() {
      this.quiz.questions.push({
        text: '',
        answers: [{ text: '', is_correct: false }]
      });
    },

    addAnswer(questionIndex) {
      this.quiz.questions[questionIndex].answers.push({ text: '', is_correct: false });
    },

    async submitQuizEdits() {
      try {
        axiosInstance.put(`/quizzes/${this.quiz.id}/`, this.quiz);
        this.$emit('quizEdited');
        this.closeModal();
      } catch (error) {
        console.error('Error editing quiz:', error);
      }
    },
    
    closeModal() {
      this.$emit('update:isVisible', false);
    }
  }
};
</script>

<style>
/* Add your modal styling here */
</style>
