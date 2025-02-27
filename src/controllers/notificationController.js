import prisma from "../config/db.js";

// Create a notification
export const addNotification = async (req, res) => {
    try {
        const { idAsset, message } = req.body;
            
        const newNotification = await prisma.notifications.create({
            data: {
                asset: { connect: { id_assets: idAsset } },
                message,
            },
        });

        res.json({
            id: newNotification.id_notifications,
            idAsset: newNotification.FK_id_assets,
            message: newNotification.message,
        });

    } catch (err) {
        console.log(err);
    }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await prisma.notifications.findMany({
            include: { asset: true },
        });
        res.json(notifications);
    } catch (err) {
        console.log(err);
    }
};