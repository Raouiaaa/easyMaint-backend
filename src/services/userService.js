import prisma from "../config/db.js";


export const getAllUsers = async () => {
    return await prisma.users.findMany();
};
