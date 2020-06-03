export interface QuestionnaireModel {
  questions: QuestionData[];
  summary: string;
}

export interface QuestionData {
  key: string;
  question: string;
  responses: string[];
  type: string;

}
