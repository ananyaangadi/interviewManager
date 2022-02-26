export interface IAddJobRequest {
  closingDate?: Date;
  hmId?: number;
  hmName?: string;
  hrId?: number;
  hrName?: string;
  jobDept?: string;
  jobDesignation?: string;
  jobMaxExp?: number;
  jobMinExp?: number;
  jobSkill?: string;
  jobType?: string;
  jobTitle?: string;
  postingDate?: Date;
  qualification?: string;
  subDept?: string;
  description?: string;
}
