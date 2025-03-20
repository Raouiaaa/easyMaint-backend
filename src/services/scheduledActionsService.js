import prisma from "../config/db.js";


export const createScheduledAction = async (fkIdAsset, fkSubCategoryID, date) => {
    return await prisma.scheduledActions.create({
        data: { 
            FK_asset_id: fkIdAsset,
            FK_id_sub: fkSubCategoryID,
            dynamicDate: date,
        }
    });
};

export const getScheduledActions = async () => {
    return await prisma.scheduledActions.findMany({
        include: { asset: true, subCategory: true },
    });
};