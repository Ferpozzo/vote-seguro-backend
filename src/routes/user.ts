import { Router } from 'express'
import { Image, User, UserInterface } from '../models/User'
import { generateToken } from '../middleware/auth'
import { environment } from '../config/config'
import fs from 'fs'
import multer from 'multer'
const upload = multer(environment.multer)
const userRouter = Router()
const url = 'users'
userRouter.get(`/${url}`, async (request, response) => {
    try {
        const users = await User.find()
        return response.status(200).send(users)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        return response.status(200).send(user)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.post(`/${url}`, async (request, response) => {
    try {
        const user = await User.create(request.body) as UserInterface
        user.password = ''
        const token = generateToken({ id: user.id })
        return response.status(201).send({ user, token })
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id)
        return response.status(200).send(user)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(user)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(user)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.post(`/${url}/:id/images`, upload.single("image"), async (request, response) => {
    const { key, mimetype, originalname: name, location: url = '', size } = request.file
    try {
        const imageVotation = await Image.create({
            _userId: request.params.id,
            name,
            key,
            mimetype,
            size,
            url
        }).then(img => {
            return response.status(201).send(img)
        })
    } catch (error) {
        console.log(error)
        return response.status(400).send(error)
    }
})
userRouter.get(`/${url}/:id/images`, async (request, response) => {
    try {
        const images = await Image.find({ _userId: request.params.id })
        return response.status(200).send(images)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.get(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await Image.findById(request.params.imageId)
        return response.status(200).send(image)
    } catch (error) {
        return response.status(400).send(error)
    }
})
userRouter.delete(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await Image.findById(request.params.imageId)
        image?.remove()
        return response.status(200).send({ message: 'Image deleted' })
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { userRouter }
