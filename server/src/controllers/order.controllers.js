import Order from '../models/order.models.js';
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/user.models.js'
import Course from '../models/course.models.js'
import ejs from '   '
import path from 'path'
import { fileURLToPath } from 'url';
import { sendMail } from '../utils/send-mail.js';


//create new order
export const purchaseCourse = asyncHandler(async (req, res) => {
    const id = req.user

    if (!id) {
        return res.status(401).json({ message: "Login session expired." })
    }

    const { courseId, payment_info } = req.body;

    const user = await User.findById(id).select("-password")
    const userCourses = user.courses

    const courseTaken = userCourses.some((course) => course._id.toString() === courseId)

    if (courseTaken) {
        return res.status(400).json({ message: "Course already taken" })
    }

    const course = await Course.findById(courseId)

    if (!course) {
        return res.status(404).json({ message: "Course not found" })
    }
    const data = {
        courseId: course._id,
        userId: user._id,
        payment_info
    }
    const order = await Order(data)

    if (!order) {
        return res.status(500).json({ message: "Something went wrong while creating new order." })
    }

    const orderData = {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        user: {
            name: user.name, email: user.email
        }

    }


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const html = ejs.renderFile(path.join(__dirname, '../views', 'confirm-order.ejs'), { order: orderData })
    const mail = await sendMail(user.email, "Order Confirmation", html)
    if (!mail) {
        return res.status(500).json({ message: "Something went wrong while sending mail." })
    }

    const newNotification = new Notification({
        title: 'New Order',
        message: `Your order for ${course.name} has been confirmed by ${user?.name}.`,
        userId: user._id
    })

    user.courses.push(course._id)

    await user.save()
    await newNotification.save()


    return res.status(201).json({ message: "Order completed successfully", course })
})


//get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('courseId userId')
    res.status(200).json(orders);
})