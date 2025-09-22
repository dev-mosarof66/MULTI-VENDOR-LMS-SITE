import Course from '../models/course.models.js'
import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateVerificationCode from "../utils/code-generator.js";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/send-mail.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../db/redis.js";


export const createCourse = asyncHandler(async (req, res) => {
    const id = req.user;
    if (!id) return res.status(401).json({ success: false, message: "Login session expired." });

    const data = req.body;
    const thumbnail = req.file?.path;

    if (!data || !thumbnail) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const upload = await cloudinary.uploader.upload(thumbnail);
    if (!upload) {
        return res.status(500).json({ message: "Something went wrong while uploading the thumbnail" });
    }

    fs.linkSync(thumbnail)

    const course = await Course({
        ...data,
        thumbnail:
        {
            public_id: upload.public_id,
            url: upload.secure_url
        },
        instructor: id,
    });

    return res.status(201).json({ message: "Course created successfully", course });
});


export const editCourse = asyncHandler(async (req, res) => {
    const id = req.user;
    const courseId = req.params.id;

    if (!id) return res.status(401).json({ success: false, message: "Login session expired." });
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const data = req.body;
    const thumbnail = req.file?.path;

    if (!data) {
        return res.status(400).json({ message: "No changes committed." });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    let upload = null;
    if (thumbnail) {
        if (course.thumbnail?.public_id) {
            await cloudinary.uploader.destroy(course.thumbnail.public_id);
        }
        upload = await cloudinary.uploader.upload(thumbnail);
    }

    if (upload) {
        data.thumbnail = { public_id: upload.public_id, url: upload.secure_url };
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, data, { new: true });
    if (!updatedCourse) {
        return res.status(500).json({ message: "Something went wrong while updating the course" });
    }

    return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
});

//delete course

export const deleteCourse = asyncHandler(async (req, res) => {
    const id = req.user;
    const courseId = req.params.id;

    if (!id) return res.status(401).json({ success: false, message: "Login session expired." });
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const course = await Course.findById(courseId)

    if (!course) return res.status(400).json({ message: "No course data found", success: false })

    const thumb = await cloudinary.uploader.destroy(course.thumbnail?.public_id)

    if(!thumb){
        return res.status(400).json({ message: "Error while deleting the course.", success: false })
    }

    await redis.del(`course : ${courseId}`)

    const courseDel = await Course.findByIdAndDelete(course._id)

    return res.status(200).json({ message: "Course deleted successfully", course });

})


//get public course for demo

export const getSingleCourse = asyncHandler(async (req, res) => {

    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const cachedCourse = await redis.get(`course : ${courseId}`)

    if (cachedCourse) {
        return res.status(200).json({ message: "Course fetched successfully", course: JSON.parse(cachedCourse) });
    }

    const course = await Course.findById(courseId).select("-courseData.suggestion -courseData.links -courseData.video_url -courseData.questions");


    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set(`course : ${courseId}`, JSON.stringify(course), "EX", expire)
    if (!course) return res.status(404).json({ message: "Course not found." });

    return res.status(200).json({ message: "Course fetched successfully", course });
});

export const getAllCourses = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const cachedCourses = await redis.get(`courses : ${id}`)

    if (cachedCourses) {
        return res.status(200).json({ message: "Courses fetched successfully", courses: JSON.parse(cachedCourses) });
    }

    const courses = await Course.find().select("-courseData.suggestion -courseData.links -courseData.video_url -courseData.questions");
    if (!courses) return res.status(404).json({ message: "Courses not found." });

    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set(`courses : ${id}`, JSON.stringify(courses), "EX", expire)

    return res.status(200).json({ message: "Courses fetched successfully", courses });
});

//get users course

export const getUserCourses = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const cachedCourse = await redis.get(`courses : ${id}`)

    if (cachedCourse) {
        return res.status(200).json({ message: "Courses fetched successfully", courses: JSON.parse(cachedCourse) });
    }

    const user = await User.findById(id).populate('courses');
    if (!user) return res.status(404).json({ message: "User not found." })
    const courses = user.courses;

    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set(`courses : ${id}`, JSON.stringify(courses), "EX", expire)

    return res.status(200).json({ message: "Courses fetched successfully", courses });
});

export const getUserSingleCourse = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const cachedCourse = await redis.get(`course : ${courseId}`)

    if (cachedCourse) {
        return res.status(200).json({ message: "Course fetched successfully", course: JSON.parse(cachedCourse) });
    }

    const user = await User.findById(id).populate('courses');
    const userCourses = user.courses;
    const course = userCourses.find(course => course._id.toString() === courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set(`course : ${courseId}`, JSON.stringify(course), "EX", expire)

    return res.status(200).json({ message: "Course fetched successfully", course });
});


//create question

export const createQuestion = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const { question, contentId } = req.body;
    if (!question || !contentId) return res.status(400).json({ message: "All fields are required." });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const content = course.courseData.find((t) => t._id.toString() === contentId)
    if (!content) {
        return res.status(404).json({ message: "Content not found." });
    }
    const newQuestion = {
        question,
        user
    }

    content.questions.push(newQuestion);
    await course.save({ validateBeforeSave: false });

    return res.status(201).json({ message: "Question created successfully", course });
});

//reply questions as admin

export const replyQuestion = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const { reply, questionId, contentId } = req.body;
    if (!reply) return res.status(400).json({ message: "All fields are required." });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const content = course.courseData.find((t) => t._id.toString() === contentId)
    if (!content) {
        return res.status(404).json({ message: "Content not found." });
    }
    const question = content.questions.find(question => question._id.toString() === questionId);
    if (!question) return res.status(404).json({ message: "Question not found." });

    const newReply = {
        user,
        answer: reply
    }
    question.reply.push(newReply);
    await course.save();

    return res.status(200).json({ message: "Question replied successfully", course });
});

//create a review

export const createReview = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const userCourses = user.courses;

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const isCoursePurchased = userCourses.some(course => course._id.toString() === courseId);

    if (!isCoursePurchased) {
        return res.status(400).json({ message: "You have not purchased this course." })
    }

    const { rating, review } = req.body;
    if (!rating || !review) return res.status(400).json({ message: "All fields are required." });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const newReview = {
        user,
        rating,
        comment: review
    }

    course.reviews.push(newReview);

    let avg_review = 0;

    course.reviews.forEach((review) => {
        avg_review += review.ratings
    });
    course.ratings = avg_review / course.reviews.length;

    await course.save({ validateBeforeSave: false });

    const newNotification = {
        title: "New Review Received",
        message: `${user.name} has given a review in ${course.name}`
    }

    // will create later

    return res.status(201).json({ message: "Review created successfully", course });
});

//reply to review
export const replyReview = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ success: false, message: "Login session expired." });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course id is required." });

    const { reply, reviewId } = req.body;
    if (!reply) return res.status(400).json({ message: "All fields are required." });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const review = course.reviews.find(review => review._id.toString() === reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    const newReply = {
        user,
        answer: reply
    }
    review.reply.push(newReply);
    await course.save();

    return res.status(200).json({ message: "Review replied successfully", course });
})