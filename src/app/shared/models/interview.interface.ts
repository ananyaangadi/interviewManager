import { IInterviewFeedback } from "./interview-feedback.interface";

export interface IInterView {
  canId?: number;
  intRound?: string;
  pnlId?: string;
  intStatus?: string;
  intFeedback?: IInterviewFeedback[] | string;
  intDate?: Date;
  canName?: string;
}
