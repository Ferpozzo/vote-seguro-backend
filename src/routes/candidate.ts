import { Router } from 'express'
import { CandidateImage, Candidate, CandidateInterface } from '../models/Candidate'
import { environment } from '../config/config'
import fs from 'fs'
import multer from 'multer'
const upload = multer(environment.multerCandidate)
const candidateRouter = Router()
const url = 'candidates'
candidateRouter.get(`/${url}`, async (request, response) => {
    try {
        const candidates = await Candidate.find().populate('votation')
        return response.status(200).send(candidates)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const candidate = await Candidate.findById(request.params.id).populate('votation')
        return response.status(200).send(candidate)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.post(`/${url}`, async (request, response) => {
    try {
        const candidate = await Candidate.create(request.body) as CandidateInterface
        return response.status(201).send(candidate)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(request.params.id)
        return response.status(200).send(candidate)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(candidate)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(candidate)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.post(`/${url}/:id/images`, upload.single("image"), async (request, response) => {
    const { key, mimetype, originalname: name, location: url = '', size } = request.file
    try {
        const imageVotation = await CandidateImage.create({
            _candidateId: request.params.id,
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
candidateRouter.get(`/${url}/:id/images`, async (request, response) => {
    try {
        const images = await CandidateImage.find({ _candidateId: request.params.id })
        return response.status(200).send(images)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.get(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await CandidateImage.findById(request.params.imageId)
        return response.status(200).send(image)
    } catch (error) {
        return response.status(400).send(error)
    }
})
candidateRouter.delete(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await CandidateImage.findById(request.params.imageId)
        image?.remove()
        return response.status(200).send({ message: 'Image deleted' })
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { candidateRouter }
