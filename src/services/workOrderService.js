import prisma from "../config/db.js";

export const dbGetAllWorkOrders = async () => {
    return await prisma.workOrders.findMany();
};

export const dbCreateWorkOrder = async (idAsset, idUser, status, startDate, endDate) => {
    return await prisma.workOrders.create({
        data: {
            asset: { connect: { id_assets: idAsset } },
            user: { connect: { id_users: idUser } },
            status,
            start_date: new Date(startDate),
            end_date: new Date(endDate),
        },
    });
}

export const dbGetOverdueWorkOrders = async () => {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    return await prisma.workOrders.findMany({
        where: {
            status: "open",
            start_date: null,
            created_at: {
                lt: threeHoursAgo,
            },
        },
    });
};