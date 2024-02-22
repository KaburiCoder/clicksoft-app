export class RoomBaseDto {
  key!: string;
  localId!: string;
  dataType!: DataType;
}

export enum DataType {
  WEB = 0,
  LOCAL = 1,
}
