export interface SaveUserArgs {
  provider: string;
  email: string;
  hashedPassword?: string;
}

export interface GetUserKeyArgs {
  provider: string;
  email: string;
}

export interface UpdateUserKeyArgs {
  filter: GetUserKeyArgs;
  data: UpdateUserData;
}

export interface UpdateUserData {
  key: string;
  localId: string;
}
