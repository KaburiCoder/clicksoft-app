import { Schema, model, Model, models } from "mongoose";

export interface IUser {
  provider: string;
  email: string;
  password: string;
  key: string;
  localId: string;
}

interface IUserMethods {
  isRegisted: () => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  provider: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  key: { type: String, required: false },
  localId: { type: String, required: false },
});

userSchema.methods.isRegisted = function () {
  return !!this.key && !!this.localId;
};
userSchema.method("isRegisted", function () { });

const User: UserModel =
  models?.User || model<IUser, UserModel>("User", userSchema);

export interface IUser {
  provider: string;
  email: string;
  password: string;
  key: string;
  localId: string;
}

export { User };
