import { Router } from 'express'
import { Service } from '../models/Service'

const serviceRouter = Router()
const url = 'services'
serviceRouter.get(`/${url}`, async (request, response) => {
    try {
        const services = await Service.find()
        return response.status(200).send(services)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const service = await Service.findById(request.params.id)
        return response.status(200).send(service)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.post(`/${url}`, async (request, response) => {
    try {
        const service = await Service.create(request.body)
        return response.status(201).send(service)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const service = await Service.findByIdAndDelete(request.params.id)
        return response.status(200).send(service)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const service = await Service.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(service)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const service = await Service.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(service)
    } catch (error) {
        return response.status(400).send(error)
    }
})
serviceRouter.get(`/locales/:localeId/${url}`, async (request, response) => {
    try {
        const services = await Service.find({ _localeId: request.params.localeId })
        return response.status(200).send(services)
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { serviceRouter }
