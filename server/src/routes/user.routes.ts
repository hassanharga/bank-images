import { Router } from 'express';
import {
  LoginController,
  RegisterController,
} from '../controllers/user.controllers';

const router = Router();
router.post('/', RegisterController);
router.post('/login', LoginController);

export default router;
