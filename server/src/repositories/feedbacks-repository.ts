export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string; //Opcional
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}