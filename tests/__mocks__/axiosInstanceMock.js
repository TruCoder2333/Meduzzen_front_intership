const axiosInstanceMock = {
    // Mock Axios methods
    get: jest.fn((url) =>{ 
      if (url.includes('/quizzes/')) {
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
        return Promise.resolve({ data: mockQuiz }); 
      };
      return Promise.resolve({ data: {} })}), 
    post: jest.fn((url) => {
      if (url.includes('/quizzes/') && url.includes('/start_attempt/')) {
        const mockQuizAttemptResponse = {"quiz_attempt_id":1};
        return Promise.resolve({ data: mockQuizAttemptResponse });
      }

      return Promise.resolve({ data: {} })}),
  
    // Mock Axios interceptors
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  };

export default axiosInstanceMock;

  