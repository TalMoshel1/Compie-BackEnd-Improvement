import express, { json } from 'express';
import {getQuestions, createQuestion} from '../controllers/question-controller.js'

const router = express.Router()

router.get('/api/question', getQuestions)
router.post('/api/question', createQuestion)

export default router