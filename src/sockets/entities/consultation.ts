import { ContentInfo } from "../models/content-info";

export class Consultation {
  id!: string;
  title!: string;
  from!: ConsultationFrom;
  to!: ConsultationTo;
}

export class ConsultationFrom {
  headers!: ContentInfo[];
  request!: string;
}

export class ConsultationTo {
  headers!: ContentInfo[];
  response!: string;
}
