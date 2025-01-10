const prisma = require('../config/db');

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};
