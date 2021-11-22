import { Router } from 'express'
import { Reservation } from '../models/Reservation'

const reservationRouter = Router()
const url = 'reservations'
reservationRouter.get(`/${url}`, async (request, response) => {
    try {
        const reservations = await Reservation.find()
        return response.status(200).send(reservations)
    } catch (error) {
        return response.status(400).send(error)
    }
})
reservationRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const reservation = await Reservation.findById(request.params.id)
        return response.status(200).send(reservation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
reservationRouter.post(`/${url}`, async (request, response) => {
    try {
        const reservation = await Reservation.create(request.body)
        return response.status(201).send(reservation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
reservationRouter.delete(`/${url}/:id`, async (request, response) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(request.params.id)
        return response.status(200).send(reservation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
reservationRouter.patch(`/${url}/:id`, async (request, response) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(reservation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
reservationRouter.put(`/${url}/:id`, async (request, response) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(request.params.id, request.body)
        return response.status(200).send(reservation)
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { reservationRouter }
