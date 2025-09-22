import Notification from "../models/notification.models.js";

//create func to get all notifications

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user._id,
        }).populate("user");
        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};