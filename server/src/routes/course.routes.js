import { Router } from "express";
import { createCourse, editCourse, deleteCourse, getAllCourses, getSingleCourse, getUserCourses, getUserSingleCourse, createQuestion, createReview, replyQuestion, replyReview } from "../controllers/course.controllers";
import middleware from "../middleware/middleware";
import authorizeRoles from "../middleware/auth";
const router = Router()


// for admin

router.route('/create-course').post(authorizeRoles('admin'), middleware, createCourse)
router.route('/edit-course').post(authorizeRoles('admin'), middleware, editCourse)
router.route('/delete-course').post(authorizeRoles('admin'), middleware, deleteCourse)
router.route('/reply-review').post(authorizeRoles('admin'), middleware, replyReview)