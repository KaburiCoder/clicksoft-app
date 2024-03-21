import { ContentInfo } from "../models/content-info";

export class BasicExam {
  id!: string;
  writeDateFullText!: string;
  headers?: ContentInfo[];
  details!: BasicExamDetail[];
}

export class BasicExamDetail {
  title!: string;
  value!: string;
}
