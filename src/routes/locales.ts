import { Router } from 'express'
import { Locale, ImageLocale, ImageLocaleSchema, ImageLocaleInterface } from '../models/Locale'
import { environment } from '../config/config'
import fs from 'fs'
import multer from 'multer'
const upload = multer(environment.multer)
const localeRouter = Router()
const url = 'locales'
localeRouter.get(`/${url}`, async (request, response) => {
    try {
        const locales = await Locale.find()
        return response.status(200).send(locales)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const locale = await Locale.findById(request.params.id)
        return response.status(200).send(locale)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.post(`/${url}`, async (request, response) => {
    try {
        const locale = await Locale.create(request.body)
        return response.status(201).send(locale)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const locale = await Locale.findByIdAndDelete(request.params.id)
        return response.status(200).send(locale)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const locale = await Locale.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(locale)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const locale = await Locale.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(locale)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.get(`/users/:userId/${url}`, async (request, response) => {
    try {
        const locales = await Locale.find({ _userId: request.params.userId })
        return response.status(200).send(locales)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.post(`/${url}/:id/images`, upload.single("image"), async (request, response) => {
    const { key, mimetype, originalname: name, location: url = '', size } = request.file
    try {
        const imageLocale = await ImageLocale.create({
            _localeId: request.params.id,
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
localeRouter.get(`/${url}/:id/images`, async (request, response) => {
    try {
        const images = await ImageLocale.find({ _localeId: request.params.id })
        return response.status(200).send(images)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.get(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await ImageLocale.findById(request.params.imageId)
        return response.status(200).send(image)
    } catch (error) {
        return response.status(400).send(error)
    }
})
localeRouter.delete(`/${url}/:id/images/:imageId`, async (request, response) => {
    try {
        const image = await ImageLocale.findById(request.params.imageId)
        image?.remove()
        return response.status(200).send({message: 'Image deleted'})
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { localeRouter }
