import prisma from "../config/db.js";


export const getActions = async () => {
    return await prisma.actions.findMany({
    include: {subCategory: true },
    }) 
};