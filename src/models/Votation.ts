import aws from 'aws-sdk';
import mongoose, { Schema } from 'mongoose'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
const s3 = new aws.S3();
import { UserInterface, UserSchema } from './User';
export interface VotationInterface extends mongoose.Document {
    _id?: string,
    name: string,
    description: string,
    initialDate: Date,
    finalDate: Date,
    candidates: [UserInterface]
    updatedAt?: Date,
    createdAt?: Date
}
export const VotationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    finalDate: {
        type: Date,
        required: true
    },
    candidates: [UserSchema]
},
    {
        timestamps: true
    }
)
export interface ImageVotationInterface extends mongoose.Document {
    _id?: string,
    _localeId?: string,
    name: string,
    key: string,
    url: string,
    size: number,
    mimetype: string,
    updatedAt?: Date,
    createdAt?: Date
}
const Votation = mongoose.model('Votation', VotationSchema)
export { Votation }