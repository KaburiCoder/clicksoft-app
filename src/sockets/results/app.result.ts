export interface AppResult<T> {
  dataList?: T[];
  status: "success" | "error" | 'aborted';
  message?: string;
}
