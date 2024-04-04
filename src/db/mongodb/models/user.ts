import { Schema, model, Model, models, Document } from "mongoose";

export interface UserAttrs {
  provider: string;
  email: string;
  password: string;
  key: string;
  localId: string;
  name: string;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document, UserAttrs { }

const userSchema = new Schema<UserAttrs, UserModel>({
  provider: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  key: { type: String, required: false },
  localId: { type: String, required: false },
  name: { type: String, required: false },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User: UserModel =
  (models?.User as UserModel) ||
  model<UserAttrs, UserModel>("User", userSchema);

export { User };
