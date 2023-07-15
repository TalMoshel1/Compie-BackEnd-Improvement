import imageRouter from './image.js'

import express from 'express'


const appRouter = express.Router()

appRouter.use(imageRouter)

export default appRouter


