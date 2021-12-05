import aws from 'aws-sdk';
import { mongoose } from '../database/database'
import bcrypt from 'bcryptjs'
import { environment } from '../config/config';
import { Schema } from 'mongoose';
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
const s3 = new aws.S3();

export interface UserInterface extends mongoose.Document {
    _id?: string,
    name: string,
    email: string,
    password: string,
    gender: 'Male' | 'Female' | 'Other',
    documentId: string,
    updatedAt?: Date,
    createdAt?: Date
}
export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3
    },
    documentId: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        unique: true,
        required: false,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    }
},
    {
        timestamps: true
    }
)

export const ImageSchema = new mongoose.Schema({
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
ImageSchema.pre('save', function () {
    if (!this.url) {
        this.url = process.env.BACKEND_URL + '/files/images/locales/' + this.key
    }
})
ImageSchema.pre('remove', function () {
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
UserSchema.pre<UserInterface>('save', async function (next) {
    const user = this
    if (!user.isModified('password')) {
        next()
    } else {
        const hash = await bcrypt.hash(this.password, environment.security.saltRounds)
        this.password = hash
        next()
    }
})
const User = mongoose.model('User', UserSchema)
const Image = mongoose.model('Image', ImageSchema)

export { User, Image }