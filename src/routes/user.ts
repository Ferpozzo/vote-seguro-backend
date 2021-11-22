import { Router } from 'express'
import { User, UserInterface } from '../models/User'
import { generateToken } from '../middleware/auth'
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
export { userRouter }
