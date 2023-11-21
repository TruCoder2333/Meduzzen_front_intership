<template>
  <div class="modal" v-if="isVisible">
    <form @submit.prevent="handleSubmit" class="modal-content">
      <input v-model="quiz.title" :placeholder="$t('title')" required />
      <textarea v-model="quiz.description" 
      :placeholder="$t('description')" 
      required>
      </textarea>
      
      <input v-model.number="quiz.frequency_in_days" 
      type="number" 
      :placeholder="$t('frequency_in_days')" 
      min="1" required 
      />

      <div v-for="(question, qIndex) in quiz.questions" :key="qIndex">
        <input v-model="question.text" :placeholder="$t('question_text')" required />

        <div v-for="(answer, aIndex) in question.answers" :key="aIndex">
          <input v-model="answer.text" :placeholder="$t('answer_text')" required />
          <input type="checkbox" v-model="answer.is_correct" /> {{ $t('is_correct') }}
        </div>

        <button @click.prevent="addAnswer(qIndex)">{{ $t('add_answer') }}</button>
      </div>

      <button @click.prevent="addQuestion">{{ $t('add_question') }}</button>
      <button type="submit">{{ isEditMode ? $t('save') : $t('create_quiz') }}</button>
      <button @click="closeModal">{{ $t('cancel') }}</button>
    </form>
  </div>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance';
import { mapGetters } from 'vuex';

export default {
  props: {
    isVisible: Boolean,
    initialQuizData: Object
  },
  data() {
    return {
      quiz: { ...this.initialQuizData } 
    };
  },
  computed: {
    isEditMode() {
      return this.initialQuizData && this.initialQuizData.id;
    },
    ...mapGetters(['getCompanyDetails'])
  },
  methods: {
    addQuestion() {
      if (!this.isEditMode && !this.quiz.questions){
        this.quiz.questions = []
      }
      this.quiz.questions.push({
        text: '',
        answers: [{ text: '', is_correct: false }]
      });
    },

    addAnswer(questionIndex) {
      if (!this.EditMode && !this.quiz.questions[questionIndex].answers){
        this.quiz.questions[questionIndex].answers = []
      }
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
    },

    async handleSubmit() {
      if (this.isEditMode) {
        try {
        axiosInstance.put(`/quizzes/${this.quiz.id}/`, this.quiz);
        this.$emit('quizEdited');
        this.closeModal();
      } catch (error) {
        console.error('Error editing quiz:', error);
      }
      } else {
        if (!this.validateQuiz()) {
        return;
        }
        try {
          this.quiz.company = this.getCompanyDetails.id
          await axiosInstance.post('/quizzes/', this.quiz);
          this.closeModal();
          this.$emit('quizCreated');
        } catch (error) {
          console.error('Error creating quiz:', error);
        }
      }
    },

    validateQuiz() {
      if (this.quiz.questions.length < 2) {
        this.errorMessage = this.$t('min_question_error');
        return false;
      }
      for (const question of this.quiz.questions) {
        if (question.answers.length < 2) {
          this.errorMessage = this.$t('min_answers_error');
          return false;
        }
      }
      return true;
    },    
  }
};
</script>


