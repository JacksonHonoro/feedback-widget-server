import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
  createdAt?: Date;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot, createdAt } = request;
    
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
      createdAt,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
          `<p>tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          `<p>Screenshot: ${screenshot}</p>`,
          `<p>Criado em: ${createdAt}</p>`,
        `</div>`
      ].join('\n')
    });
  }
}