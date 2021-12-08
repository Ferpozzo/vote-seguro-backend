import aws from 'aws-sdk';
import { mongoose } from '../database/database'
import { Schema } from 'mongoose';
import fs from 'fs'
import path from 'path'
const s3 = new aws.S3();

export interface CandidateInterface extends mongoose.Document {
    _id?: string,
    votation: string,
    name: string,
    documentId: string,
    number: number,
    group: string,
    image: string,
    updatedAt?: Date,
    createdAt?: Date
}
export interface CandidateImageInterface extends mongoose.Document {
    _id?: string,
    candidate: string,
    name: string,
    key: string,
    url: string,
    size: number,
    mimetype: string,
    updatedAt?: Date,
    createdAt?: Date
}
export const CandidateSchema = new mongoose.Schema({
    votation: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Votation'
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3
    },
    documentId: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Other']
    },
    group: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    img: {
        type: Schema.Types.ObjectId,
        ref: 'CandidateImage',
        required: false
    }
},
    {
        timestamps: true
    }
)

export const CandidateImageSchema = new mongoose.Schema({
    candidate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Candidate'
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
CandidateImageSchema.pre<CandidateImageInterface>('save', function () {
    if (!this.url) {
        this.url = process.env.BACKEND_URL + '/files/images/candidates/' + this.key
    }
})
CandidateImageSchema.pre<CandidateImageInterface>('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: this.key
        }).promise()
    } else {
        return fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'images', 'candidates', this.key), cb => {

        })
    }
})
const Candidate = mongoose.model('Candidate', CandidateSchema)
const CandidateImage = mongoose.model('CandidateImage', CandidateImageSchema)

export { Candidate, CandidateImage }