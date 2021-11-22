import aws from 'aws-sdk';
import { ServiceSchema } from './Service';
import mongoose, { Schema } from 'mongoose'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
const s3 = new aws.S3();
export interface LocaleInterface extends mongoose.Document {
    _id?: string,
    _userId?: string,
    name: string,
    description: string,
    type: 'Casa' | 'Hotel' | 'Fazenda' | 'Turístico' | 'Comércio',
    status: 'Active' | 'Inactive',
    updatedAt?: Date,
    address: string,
    createdAt?: Date
}
export const LocaleSchema = new mongoose.Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)
export interface ImageLocaleInterface extends mongoose.Document {
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
export const ImageLocaleSchema = new mongoose.Schema({
    _localeId: {
        type: Schema.Types.ObjectId,
        required: true
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
ImageLocaleSchema.pre('save', function () {
    if (!this.url) {
        this.url = process.env.BACKEND_URL + '/files/images/locales/' + this.key
    }
})
ImageLocaleSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: this.key
        }).promise()
    } else {
        return fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'images', 'locales', this.key), cb => {

        })
    }
})
const Locale = mongoose.model('Locale', LocaleSchema)
const ImageLocale = mongoose.model('ImageLocale', ImageLocaleSchema)
export { Locale, ImageLocale }