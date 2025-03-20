import prisma from "../config/db";


export const getSubCategories = async () => {
    return await prisma.subCategory.findMany();
};