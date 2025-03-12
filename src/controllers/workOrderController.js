import prisma from "../config/db.js";

// Create a work order
export const addWorkOrder = async (req, res) => {
    try {
        const { idAsset, idUser, status, startDate, endDate } = req.body;

        const newWorkOrder = await prisma.workOrders.create({
            data: {
                asset: { connect: { id_assets: idAsset } },
                user: { connect: { id_users: idUser } },
                status,
                start_date: new Date(startDate),
                end_date: new Date(endDate),
            },
        });
    
        res.json({
            id: newWorkOrder.id_work_order,
            status: newWorkOrder.status,
        });
    } catch (err) {
        console.log(err);
    }
};

// get all work orders 
export const getAllWorkOrders = async (req, res) => {
    try {
        const workOrders = await prisma.workOrders.findMany({
            include: { asset: true, user: true },
        });

        const simplifiedWorkOrders = workOrders.map(({ id_work_order, FK_id_asset, status }) => ({
            id: id_work_order,
            // FKidAsset: FK_id_asset,
            status,
        }));
        res.json({ workOrders: simplifiedWorkOrders });
    } catch (err) {
        console.log(err);
    }
};

// Get overdue work orders
export const getOverdueWorkOrders = async (req, res) => {
    try {
        const workOrders = await prisma.workOrders.findMany();

        // Filtrer les ordres de travail en retard (plus de 3 heures)
        const overdueWorkOrders = workOrders.filter((order) => {
                const currentDate = new Date();
                const createdAtDate = new Date(order.created_at);
                const differenceInHours = (currentDate - createdAtDate) / (1000 * 60 * 60);
                return differenceInHours > 3 && order.status.toLowerCase() === "open" && order.start_date === null;
            });

        // Envoyer la réponse avec les ordres en retard
        const simplifiedOverdueWorkOrders = overdueWorkOrders.map(({ id_work_order, status }) => ({
            id: id_work_order,
            status,
        }));
        res.json({overdueWorkOrders: simplifiedOverdueWorkOrders});
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};