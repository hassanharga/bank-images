import { Router } from 'express';
import {
  addImage,
  editTags,
  deleteImage,
  getImagesByTagName,
  uploadImage,
} from '../controllers/images.controller';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', getImagesByTagName);
router.post('/', auth, addImage);
router.put('/', editTags);
router.delete('/', auth, deleteImage);
router.post('/upload', auth, uploadImage);

export default router;
