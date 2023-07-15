import express from 'express';
import {getPhotos, addComment, createPhoto} from '../controllers/image.js';

const router = express.Router();

router.post('/api/photo', createPhoto)
router.get('/api/photo', getPhotos);
router.put('/api/photo', addComment);

export default router;