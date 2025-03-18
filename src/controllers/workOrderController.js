import { dbGetAllWorkOrders, dbCreateWorkOrder, dbGetOverdueWorkOrders } from "../services/workOrderService.js";

// Create a work order
export const addWorkOrder = async (req, res) => {
    try {
        const { idAsset, idUser, status, startDate, endDate } = req.body;

        const newWorkOrder = await dbCreateWorkOrder(idAsset, idUser, status, startDate, endDate);

        res.json(newWorkOrder);
    } catch (err) {
        console.log(err);
    }
};

// get all work orders 
export const getAllWorkOrders = async (req, res) => {
    try {
        const workOrders = await dbGetAllWorkOrders();

        res.json(workOrders);
    } catch (err) {
        console.log(err);
    }
};


// Get overdue work orders
export const getOverdueWorkOrders = async (req, res) => {
    try {
        const data = await dbGetOverdueWorkOrders();

        res.json(data);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};