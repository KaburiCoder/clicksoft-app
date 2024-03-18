export class Scan {
  id!: string;
  /** 작성일자 */
  writeDateShortText!: string;
  code!: string;
  name!: string;
  // scanList?: ScanInfo[];
  details?: ScanDetail[];
}

// export class ScanInfo {
//   id!: string;
//   name!: string;
// }

export class ScanDetail {
  id!: string;
  image!: Buffer;
}
