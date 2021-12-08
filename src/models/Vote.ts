import mongoose, { Schema } from 'mongoose'

export interface VoteInterface extends mongoose.Document {
    _id?: string,
    user: string,
    votation: string,
    candidate: string,
    updatedAt?: Date,
    createdAt?: Date
}
export const VoteSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'User'
    },
    votation: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'Votation'
    },
    candidate: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'Candidate'
    }
},
    {
        timestamps: true
    }
)
VoteSchema.index({ user: 1, votation: 1 }, { unique: true })
const Vote = mongoose.model('Vote', VoteSchema)

export { Vote }