import { Router } from 'express'
import { Vote, VoteInterface } from '../models/Vote'
const voteRouter = Router()
const url = 'votes'
voteRouter.get(`/${url}`, async (request, response) => {
    try {
        const votes = await Vote.find().populate('subElections.votation').populate('candidate').populate('user')
        return response.status(200).send(votes)
    } catch (error) {
        return response.status(400).send(error)
    }
})
voteRouter.get(`/${url}/:id`, async (request, response) => {
    try {
        const vote = await Vote.findById(request.params.id).populate('votation').populate('candidate').populate('user')
        return response.status(200).send(vote)
    } catch (error) {
        return response.status(400).send(error)
    }
})
voteRouter.get(`votations/:votationId/${url}`, async (request, response) => {
    try {
        const votes = await Vote.find({ _votationId: request.params.votationId }).populate('votation').populate('candidate').populate('user')
        return response.status(200).send(votes)
    } catch (error) {
        return response.status(400).send(error)
    }
})
voteRouter.get(`votations/:votationId/${url}/:userId`, async (request, response) => {
    try {
        const vote = await Vote.find({ _votationId: request.params.votationId, _userId: request.params.userId }).populate('votation').populate('candidate').populate('user')
        return response.status(200).send(vote)
    } catch (error) {
        return response.status(400).send(error)
    }
})
voteRouter.get(`users/:userId/${url}`, async (request, response) => {
    try {
        const votes = await Vote.find({ _userId: request.params.userId }).populate('votation').populate('candidate').populate('user')
        return response.status(200).send(votes)
    } catch (error) {
        return response.status(400).send(error)
    }
})
voteRouter.post(`/${url}`, async (request: any, response: any) => {
    try {
        if (new Date(request.body.votation.startDate) > new Date()) {
            return response.status(404).send({ error: "Votação ainda não começou" })
        } else if (new Date(request.body.votation.endDate) < new Date()) {
            return response.status(404).send({ error: "Votação já terminou" })
        }
        var tempVote = request.body
        tempVote.user = request.userId
        const vote = await Vote.create(tempVote) as VoteInterface
        return response.status(201).send(vote)
    } catch (error) {
        return response.status(400).send(error)
    }
})
export { voteRouter }
