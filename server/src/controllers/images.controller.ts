import { RequestHandler } from 'express';
import * as ImageModel from '../models/images.model';
import CustomError from '../utils/customError';

export const addImage: RequestHandler = async (req: any, res, next) => {
  try {
    const { url, tags } = req.body;
    if (!url) throw new CustomError('auth.error.missingParams', 400);
    const image = await ImageModel.addImage({
      url,
      tags: tags || [],
      userId: req.decoded._id,
    });
    return res.json({ image });
  } catch (error) {
    console.error('error[addImage]', error);
    next(error);
  }
};

export const editTags: RequestHandler = async (req: any, res, next) => {
  try {
    const { _id, tags } = req.body;
    if (!_id || !tags) throw new CustomError('auth.error.missingParams', 400);
    const image = await ImageModel.editTags(_id, tags || []);
    return res.json({ image });
  } catch (error) {
    console.error('error[editTags]', error);
    next(error);
  }
};

export const uploadImage: RequestHandler = async (req: any, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let image = req.files.image;
    // console.log('image', image);

    // Use the mv() method to place the file somewhere on your server
    image.mv(
      `${__dirname}/../../../web/public/assets/uploads/${image.name}`,
      function (err: any) {
        if (err) return res.status(500).send(err);
        res.json({ url: `/assets/uploads/${image.name}` });
      }
    );
  } catch (error) {
    console.error('error[uploadImage]', error);
    next(error);
  }
};

export const deleteImage: RequestHandler = async (req: any, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new CustomError('auth.error.missingParams', 400);
    const img: any = await ImageModel.findImageById(_id);
    if (!img || img.userId.toString() !== req.decoded._id.toString())
      throw new CustomError('auth.error.notOwner', 400);
    const image = await ImageModel.deleteImage(_id);
    return res.json({ image });
  } catch (error) {
    console.error('error[deleteImage]', error);
    next(error);
  }
};

export const getImagesByTagName: RequestHandler = async (
  req: any,
  res,
  next
) => {
  try {
    const { tagName } = req.query;
    let images: any = [];
    // if (!tagName) throw new CustomError('auth.error.missingParams', 400);
    if (tagName) {
      images = await ImageModel.findImagesBytagName(tagName.split(' '));
    } else {
      images = await ImageModel.findAllImages();
    }
    return res.json({ images });
  } catch (error) {
    console.error('error[getImagesByTagName]', error);
    next(error);
  }
};
