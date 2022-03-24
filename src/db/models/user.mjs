import m from "mongoose";
import crypto from "crypto";

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
    password: { type: Buffer, required: true },
    salt: { type: Buffer },
    name: { type: String, trim: true },
  },
  OPTS
);

UserSchema.pre("save", function saltUser(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = crypto.randomBytes(16);
  return crypto.pbkdf2(
    user.password,
    salt,
    310000,
    32,
    "sha256",
    (err, secret) => {
      if (err) return next(err);
      user.salt = salt;
      user.password = secret;
      next();
    }
  );
});

const User = m.model("User", UserSchema);

export default User;
