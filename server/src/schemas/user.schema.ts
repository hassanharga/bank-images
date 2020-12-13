import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  password: { type: String },
  email: { type: String, unique: true },
});

model('User', userSchema);
