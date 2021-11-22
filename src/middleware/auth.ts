import bcrypt from 'bcryptjs';
import express, { Router } from 'express'
import { User, UserInterface } from '../models/User'
import * as jwt from 'jsonwebtoken'
import { environment } from '../config/config'
const authRouter = Router()
const url = 'auth'

export function generateToken(params = {}) {
    return jwt.sign(params, environment.security.secret, {
        expiresIn: 86400
    })
}
authRouter.post(`/${url}`, async (request, response) => {
    try {
        const auth = request.body
        const user = await User.findOne({ email: auth.email }).select('+password') as UserInterface
        if (!user) {
            return response.status(400).send({ error: 'User not found' })
        }
        if (!await bcrypt.compare(auth.password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' })
        }
        user.password = ''
        const token = generateToken({ id: user.id })
        return response.status(200).send({ user, token })
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { authRouter }

