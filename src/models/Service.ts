import mongoose, { Schema } from 'mongoose'

export interface ServiceInterface extends mongoose.Document {
    _id?: string,
    _localeId?: string,
    name: string,
    description: string,
    value: number,
    updatedAt?: Date,
    createdAt?: Date
}
export const ServiceSchema = new mongoose.Schema({
    _localeId: {
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
    value: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
)
const Service = mongoose.model('Service', ServiceSchema)

export { Service }