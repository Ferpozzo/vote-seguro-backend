
import { environment } from '../config/config'
import { Router } from 'express'
import { SubElection, SubElectionsInterface, Votation, VotationImage } from '../models/Votation'
import fs from 'fs'
import multer from 'multer'
import { Candidate } from '../models/Candidate'
import { Vote } from '../models/Vote'
const authMiddleware = require('../middleware/auth')
const upload = multer(environment.multerVotation)
const votationRouter = Router()
votationRouter.use(authMiddleware)
const url = 'votations'
votationRouter.get(`/${url}`, async (request: any, response: any) => {
    try {
        const votations = await Votation.find().populate({ path: 'subElections.candidates' })
        return response.status(200).send(votations)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const votation = await Votation.findById(request.params.id).populate('subElections.candidates')

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
votationRouter.post(`/${url}/:id/images`, upload.single("image"), async (request, response) => {
    const { key, mimetype, originalname: name, location: url = '', size } = request.file
    try {
        const imageVotation = await VotationImage.create({
            _votationId: request.params.id,
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
votationRouter.get(`/${url}/:id/images`, async (request, response) => {
    try {
        const images = await VotationImage.find({ _votationId: request.params.id })
        return response.status(200).send(images)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.get(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await VotationImage.findById(request.params.imageId)
        return response.status(200).send(image)
    } catch (error) {
        return response.status(400).send(error)
    }
})
votationRouter.delete(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await VotationImage.findById(request.params.imageId)
        image?.remove()
        return response.status(200).send({ message: 'Image deleted' })
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { votationRouter }
