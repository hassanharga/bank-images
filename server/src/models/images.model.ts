import { model } from 'mongoose';

const ImageSchema = model('Image');

export const addImage = async (payload: {
  url: string;
  userId: string;
  tags: string[];
}) => {
  return await ImageSchema.create(payload);
};

export const editTags = async (_id: string, newTags: string[]) => {
  const image: any = await ImageSchema.findOne({ _id });
  if (!image) return null;

  const allTags = Array.from(new Set([...(image.tags || []), ...newTags]));
  image.tags = allTags;
  await image.save();
  return image;

  // return await ImageSchema.findByIdAndUpdate({_id}, {$set:{tags}})
};

export const findAllImages = async () => {
  return await ImageSchema.find({});
};

export const findImagesBytagName = async (tagName: string[]) => {
  return await ImageSchema.find({ tags: { $in: tagName } });
};

export const findImageById = async (_id: string) => {
  return await ImageSchema.findOne({ _id });
};

export const deleteImage = async (_id: string) => {
  return await ImageSchema.findByIdAndRemove({ _id });
};
