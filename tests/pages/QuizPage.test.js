import { render, fireEvent } from '@testing-library/vue';
import QuizPage from '@/pages/QuizPage.vue';
import axiosMock from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import i18nMock from '../__mocks__/i18nMock.js';
import { waitFor } from '@testing-library/vue';



jest.mock('axios');
jest.mock('@/utils/axiosInstance', () => require('../__mocks__/axiosInstanceMock.js'));

const mockUser = {
  id: 123,
  username: "Mock User",

};

const mockCompany = {
  id: 100,
  name: "Mock Company",
  "members": [
    123,
],
};

const mockQuiz = {
  id: 100,
  title: 'Sample Quiz',
  description: 'Sample description',
  frequency_in_days: 1,
  questions: [
    {
      id: 101,
      text: 'Question 1',
      answers: [
        { id: 201, text: 'Answer 1' },
        { id: 202, text: 'Answer 2' }
      ],
    },
    {
        id: 102,
        text: 'Question 2',
        answers: [
          { id: 203, text: 'Answer 1' },
          { id: 204, text: 'Answer 2' }
        ],
      },
  ],
  company: 100,
};

const mockAnswers = [
  {
    "quiz_attempt": 1,
    "question": 101,
    "chosen_answer": 202
  },
  {
    "quiz_attempt": 1,
    "question": 102,
    "chosen_answer": 203
  }
]

const mockedRoute = {
  params: {
    quizId: '100',  
  },
};

axiosMock.get.mockResolvedValue({ data: mockQuiz });

const routes = [
  { path: '/', component: { template: '<div></div>' } },
  { path: '/company_profile/', component: { template: '<div></div>' } },

];

const router = createRouter({
  history: createWebHistory(),
  routes 
});

const store = createStore({
  state:  {
    currentUser: mockUser,
  },
  getters: {
    getCompanyDetails: () => mockCompany,
    getCurrentUser: () => mockUser
  },
})

describe('QuizPage', () => {
  it('renders quiz and questions', async () => {
    
    const { getByText, findAllByRole } = render(QuizPage, { 
      global: {
        plugins: [router, store, i18nMock],
        mocks: {
          $route: mockedRoute,
        },
      },
    });

    await waitFor(() => getByText('Sample Quiz'));

    const options = await findAllByRole('radio');
    expect(options.length).toBe(4);  
  });

  it('submits the quiz', async () => {
    const { getByText, getAllByRole } = render(QuizPage, { 
      global: {
        plugins: [router, store, i18nMock],
        mocks: {
          $route: mockedRoute,
        },
      },
    });
    await waitFor(() => getAllByRole('radio'));
    const radioButtons = getAllByRole('radio');
    for (let i = 0; i < radioButtons.length; i=i+2) {
      await fireEvent.click(radioButtons[i]);
    }
    await waitFor(() => getByText('Submit'));
    const submitButton = getByText('Submit'); // Adjust the text to match your localization
    await fireEvent.click(submitButton);

  });

  // Add more tests as needed
});
