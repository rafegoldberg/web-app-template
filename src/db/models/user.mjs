import m from "mongoose";

const OPTS = {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: {
    getters: true,
    versionKey: false,
    depopulate: false,
    virtuals: true,
  },
};

const UserSchema = new m.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, trim: true, required: true },
    salt: { type: String },
    name: { type: String, trim: true },
  },
  OPTS
);

const User = m.model("User", UserSchema);

export default User;
