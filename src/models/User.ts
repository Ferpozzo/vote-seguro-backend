import { LocaleSchema } from './Locale';
import { mongoose } from '../database/database'
import bcrypt from 'bcryptjs'
import { environment } from '../config/config';

export interface UserInterface extends mongoose.Document {
    _id?: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    gender: 'Male' | 'Female' | 'Other',
    documentId: string,
    type: 'Consumer' | 'Commercial' | 'Both',
    status: 'Active' | 'Inactive',
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
    phone: {
        type: String,
        required: true
    },
    documentId: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    type: {
        type: String,
        required: true,
        enum: ['Consumer', 'Commercial', 'Both']
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive', 'Banned']
    }
},
    {
        timestamps: true
    }
)

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

export { User }