import aws from 'aws-sdk';
import mongoose, { Schema } from 'mongoose'
import fs from 'fs'
import path from 'path'
const s3 = new aws.S3();
import { Candidate, CandidateInterface, CandidateSchema } from './Candidate';
export interface VotationInterface extends mongoose.Document {
    _id?: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    updatedAt?: Date,
    createdAt?: Date
}
export interface SubElectionsInterface extends mongoose.Document {
    _id?: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    candidates: [CandidateInterface]
    updatedAt?: Date,
    createdAt?: Date
}

export const SubElectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    candidates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate',
            required: false
        }
    ]
},
    {
        timestamps: true
    }
)
export const VotationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    subElections: [
        {
            type: SubElectionsSchema,
            required: false
        }
    ]
},
    {
        timestamps: true
    }
)
export interface VotationImageInterface extends mongoose.Document {
    _id?: string,
    votation: string,
    name: string,
    key: string,
    url: string,
    size: number,
    mimetype: string,
    updatedAt?: Date,
    createdAt?: Date
}
export const VotationImageSchema = new mongoose.Schema({
    votation: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Votation'
    },
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    size: {
        type: Number
    },
    mimetype: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)
VotationSchema.index({ _userId: 1, _votationId: 1, _candidateId: 1 }, { unique: true })

VotationImageSchema.pre<VotationImageInterface>('save', function () {
    if (!this.url) {
        this.url = process.env.BACKEND_URL + '/files/images/votations/' + this.key
    }
})
VotationImageSchema.pre<VotationImageInterface>('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: this.key
        }).promise()
    } else {
        return fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'images', 'votations', this.key), cb => {

        })
    }
})
const Votation = mongoose.model('Votation', VotationSchema)
const VotationImage = mongoose.model('VotationImage', VotationImageSchema)
const SubElection = mongoose.model('SubElection', SubElectionsSchema)
export { Votation, VotationImage, SubElection }