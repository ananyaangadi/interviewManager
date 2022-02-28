export interface IInterviewFeedback {
  answeredList?: string[];
  unansweredList?: string[];
  round?: string;
  technicalKnowledge?: string;
  understanding?: string;
  explainability?: string;
  recommendedForNextRound?: "yes" | "no" | "na";
  comment?: string;
}
