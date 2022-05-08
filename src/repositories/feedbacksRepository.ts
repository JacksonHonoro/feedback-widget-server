export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
  createdAt?: Date;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}