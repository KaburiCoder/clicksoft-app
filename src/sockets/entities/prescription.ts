export class Prescription {
  shortDateText!: string;
  orderCode?: string;
  orderName!: string;

  /** 일투 */
  dailyDose!: number;
  /** 횟수 */
  frequency!: number;
  /** 총투 */
  day!: number;
  /** 용법 */
  yongbup!: string;

  orderType?: OrderType;
}

export enum OrderType {
  NORMAL = 0,
  INSTRUCTIONS = 1,
  GROUP = 2,
  SUB_ITEM = 3,
}
