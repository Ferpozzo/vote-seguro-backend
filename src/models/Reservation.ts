import mongoose, { Schema } from 'mongoose'

export interface ReservationInterface extends mongoose.Document {
    _id?: string,
    _localeId: string,
    _userId: string,
    initialDate: Date,
    finalDate: Date,
    updatedAt?: Date,
    createdAt?: Date
}
export const ReservationSchema = new mongoose.Schema({
    _localeId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    _userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    finalDate: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    }
)
const Reservation = mongoose.model('Reservation', ReservationSchema)

export { Reservation }