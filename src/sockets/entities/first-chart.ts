import { ContentInfo } from "../models/content-info";

export class FirstChart {
  id!: string;
  writeDateFullText!: string;
  headers?: ContentInfo[];
  details!: ContentInfo[];
}
