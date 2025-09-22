import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    payment_info: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)
export default Order