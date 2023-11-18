<template>
    <div class="modal" v-if="isVisible">
      <form @submit.prevent="submitQuiz" class="modal-content">
        
        <input v-model="title" :placeholder="$t('title')" required />
        <textarea v-model="description" :placeholder="$t('description')" required></textarea>
        <input v-model.number="frequency_in_days" type="number" :placeholder="$t('frequency_in_days')" min="1" required />
          
        <div v-for="(question, qIndex) in questions" :key="qIndex">
        <input v-model="question.text" :placeholder="$t('question_text')" required />

        <div v-for="(answer, aIndex) in question.answers" :key="aIndex">
          <input v-model="answer.text" :placeholder="$t('answer_text')" required />
          <input type="checkbox" v-model="answer.is_correct" /> {{ $t('is_correct') }}
        </div>

        <button @click.prevent="addAnswer(qIndex)">{{ $t('add_answer') }}</button>
        </div>

        <button @click.prevent="addQuestion">{{ $t('add_question') }}</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit">{{ $t('create_quiz') }}</button>
        <button @click="closeModal">{{ $t('cancel') }}</button>
      </form>
    </div>
</template>
  
<script>
import axiosInstance from '@/utils/axiosInstance';

export default {
  props: ['isVisible', 'companyId'],
    
  data() {
    return {
      title: '',
      description: '',
      frequency_in_days: null,
      questions: [
        {
          text: '',
          answers: [
            { text: '', is_correct: false },
          ]
        }
      ],
    };
  },
    
  methods: {
    async submitQuiz() {
      if (!this.validateQuiz()) {
        return;
      }
      try {
        const data = { 
          title: this.title,
          description: this.description,
          frequency_in_days: this.frequency_in_days, 
          company: this.companyId,
          questions: this.questions,
        };  
      await axiosInstance.post('/quizzes/', data);
      this.closeModal();
      this.$emit('quizCreated');
      } catch (error) {
        console.error('Error creating quiz:', error);
      }
    },

    addQuestion() {
      this.questions.push({
        text: '',
        answers: [{ text: '', is_correct: false }]
      });
    },

    addAnswer(questionIndex) {
      this.questions[questionIndex].answers.push({ text: '', is_correct: false });
    },

    closeModal() {
      this.$emit('update:isVisible', false);
    },


    validateQuiz() {
      if (this.questions.length < 2) {
        this.errorMessage = this.$t('min_question_error');
        return false;
      }
      for (const question of this.questions) {
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
  
<style>
.modal {
  z-index: 1000;
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}

.modal-content {
  background-color: #797979;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  z-index: 1001; 
}

.error-message {
    color: rgb(0, 0, 0);
    z-index: 1002; 
  }

</style>
  