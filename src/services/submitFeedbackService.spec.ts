import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: async () => {} },
  { sendMail: async () => {} },
);

describe('Submit feedback', () => {
  it('should submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'bug comment',
      screenshot: 'data:image/png;base64,kjakdjksajdkasjd.jpg',
      createdAt: new Date(),
    })).resolves.not.toThrow(); 
    
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
    
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'bug comment',
      screenshot: 'data:image/png;base64,kjakdjksajdkasjd.jpg',
      createdAt: new Date(),
    })).rejects.toThrow();    
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,kjakdjksajdkasjd.jpg',
      createdAt: new Date(),
    })).rejects.toThrow();    
  })

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: '123',
      createdAt: new Date(),
    })).rejects.toThrow();    
  })

})