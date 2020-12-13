import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  url: { type: String },
  userId: { type: String, ref: 'User' },
  tags: [String],
});

model('Image', imageSchema);
