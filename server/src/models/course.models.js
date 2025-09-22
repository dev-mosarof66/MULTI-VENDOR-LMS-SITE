import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    comments:
    {
        type: String

    }
}, { timestamps: true })


const linkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true })

const questionSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    replies: [{
        type: Object
    }]
}, { timestamps: true })



const courseDataSchema = new Schema({
    video_url: {
        type: String
    },
    video_thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoSection: {
        type: String
    },
    duration: {
        type: Number,
        default: 0
    },
    video_player: {
        type: String
    },
    links: [linkSchema],
    suggestion: {
        type: String
    },
    questions: [questionSchema]

})

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    tags: [{
        type: String,
        required: true
    }],
    level: {
        type: String,
        required: true
    },
    demo_url: {
        type: String,
        required: true
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)
export default Course