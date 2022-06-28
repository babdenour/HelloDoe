export interface QuestionSheet {
  createdAt: number;
  updatedAt: number;
  id: string;
  question: string;
  doer: string;
  quizz: string;
  answer: string;
  score: number;
}
