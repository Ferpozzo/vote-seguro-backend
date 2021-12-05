import { Router } from 'express'
import { Votation } from '../models/Votation'

const votationRouter = Router()
const url = 'votations'
votationRouter.get(`/${url}`, async (request, response) => {
    try {
        const votations = await Votation.find()
        return response.status(200).send(votations)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const votation = await Votation.findById(request.params.id)
        return response.status(200).send(votation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.post(`/${url}`, async (request, response) => {
    try {
        const votation = await Votation.create(request.body)
        return response.status(201).send(votation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const votation = await Votation.findByIdAndDelete(request.params.id)
        return response.status(200).send(votation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const votation = await Votation.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(votation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const votation = await Votation.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(votation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { votationRouter }
