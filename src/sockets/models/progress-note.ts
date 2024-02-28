export class ProgressNote implements IProgressNote {
  /**
   * 작성일자
   */
  writeDateFullText!: string;

  /**
   * 작성자
   */
  writer!: string;

  /**
   * 유형명칭
   */
  typeName!: string;

  /**
   * 내용
   */
  detail!: string;

  /**
   * 의사명
   */
  doctorName!: string;
}

export interface IProgressNote {
  /**
  * 작성일자
  */
  writeDateFullText: string;

  /**
   * 작성자
   */
  writer: string;

  /**
   * 유형명칭
   */
  typeName: string;

  /**
   * 내용
   */
  detail: string;

  /**
   * 의사명
   */
  doctorName: string;
}