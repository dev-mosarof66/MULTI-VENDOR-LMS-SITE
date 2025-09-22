import mongoose, { Schema } from 'mongoose'

const notificationScehma = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })


const Notification = mongoose.model('Notification', notificationScehma)
export default Notification