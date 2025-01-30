import {getAllUsers} from "../services/userService.js";
import prisma from "../config/db.js";

export const getAllUsersFromDB = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addUser = async (req, res) => {
    try{
        const { username, password, role } = req.body;
        const newUser = await prisma.users.create({
            data: { username, password, role },
        });
        res.json({
            id: newUser.id_users,
            username: newUser.username,
            role: newUser.role,
        });
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await prisma.users.findUnique({
            where: { username },
        });
    
        if (foundUser && foundUser.password === password) {
            res.json({
                success: true,
                message: "Authentication successful",
                data: {
                    user: {
                        id: foundUser.id_users,
                        username: foundUser.username,
                        role: foundUser.role,
                    },
                },
            });
        }   
    } catch (err) {
        res.status(401).json({ message: "Invalid username or password" });
    }
}

export const usersFiltered = async(req, res) => {
    try {
        const users = await prisma.users.findMany();
        const simplifiedUsers = users.map(({ id_users, username, role }) => ({
            id: id_users,
            username,
            role,
        }));
        res.json({
            data: simplifiedUsers,
            success: true,
        });
    } catch (err) {
        console.log(err);
    }
}


