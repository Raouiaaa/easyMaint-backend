import prisma from "../config/db.js";


export const getAllUsers = async () => {
    return await prisma.users.findMany();
};


export const getUserByUsername = async (username) => {
    const foundUser = await prisma.users.findUnique({
        where: { username },
    });
    return foundUser;
};
