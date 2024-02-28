export interface JoinRoomDto {
  key: string;
  localId: string;
  dataType: DataType.WEB;
}

export enum DataType {
  WEB = 0,
  LOCAL = 1,
}
