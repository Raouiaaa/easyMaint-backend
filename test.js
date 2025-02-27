import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST - Create a new user
// app.post("/users", async (req, res) => {
    // const { username, password, role } = req.body;
    // const newUser = await prisma.users.create({
    //     data: { username, password, role },
    // });
    // res.json({
    //     id: newUser.id_users,
    //     username: newUser.username,
    //     role: newUser.role,
    // });
// });

// User login
// app.post("/users/login", async (req, res) => {
//     const { username, password } = req.body;
//     const foundUser = await prisma.users.findUnique({
//         where: { username },
//     });

//     if (foundUser && foundUser.password === password) {
//         res.json({
//             success: true,
//             message: "Authentication successful",
//             data: {
//                 user: {
//                     id: foundUser.id_users,
//                     username: foundUser.username,
//                     role: foundUser.role,
//                 },
//             },
//         });
//     } else {
//         res.status(401).json({ message: "Invalid username or password" });
//     }
// });

// Get all users
// app.get("/users", async (req, res) => {
//     const users = await prisma.users.findMany();
//     const simplifiedUsers = users.map(({ id_users, username, role }) => ({
//         id: id_users,
//         username,
//         role,
//     }));
//     res.json({
//         data: simplifiedUsers,
//         success: true,
//     });
// });

// Create a new asset
// app.post("/assets", async (req, res) => {
    // const {
    //     name,
    //     location,
    //     category,
    //     installationDate,
    //     subCategory,
    //     maintenanceFrequencyInDays,
    //     fkTechnicalSpecificationsID,
    // } = req.body;

    // const newAsset = await prisma.assets.create({
    //     data: {
    //         name,
    //         location,
    //         category,
    //         installation_date: new Date(installationDate),
    //         sub_category: subCategory,
    //         maintenance_frequency_inDays: maintenanceFrequencyInDays,
    //         technicalSpecifications: fkTechnicalSpecificationsID
    //             ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
    //             : undefined,
    //     },
    // });

    // res.json({
    //     id: newAsset.id_assets,
    //     name: newAsset.name,
    // });
// });

// Get all assets
// app.get("/assets", async (req, res) => {
//     const assets = await prisma.assets.findMany({
//         include: { technicalSpecifications: true },
//     });
//     const simplifiedAssets = assets.map(({ id_assets, name, location }) => ({
//         id: id_assets,
//         name,
//         location,
//     }));
//     res.json({ assets: simplifiedAssets });
// });

// Update an asset
// app.put("/assets/:id", async (req, res) => {
//     const id = parseInt(req.params.id);
//     const {
//         name,
//         location,
//         category,
//         installationDate,
//         subCategory,
//         maintenanceFrequencyInDays,
//         fkTechnicalSpecificationsID,
//     } = req.body;

//     const updatedAsset = await prisma.assets.update({
//         where: { id_assets: id },
//         data: {
//             name,
//             location,
//             category,
//             installation_date: installationDate,
//             sub_category: subCategory,
//             maintenance_frequency_inDays: maintenanceFrequencyInDays,
//             technicalSpecifications: fkTechnicalSpecificationsID
//                 ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
//                 : undefined,
//         },
//     });

//     res.json(updatedAsset);
// });

// Create a new technical specification
// app.post("/technical-specifications", async (req, res) => {
//     const {
//         equipmentReference,
//         manufacturer,
//         ratedVoltage,
//         ratedCurrent,
//         ratedPower,
//         frequency,
//         speed,
//         insulationClass,
//         ingressProtection,
//         operatingTemperatureRange,
//     } = req.body;

//     const newTechnicalSpecification = await prisma.technicalSpecifications.create({
//         data: {
//             equipment_reference: equipmentReference,
//             manufacturer,
//             rated_voltage: ratedVoltage,
//             rated_current: ratedCurrent,
//             rated_power: ratedPower,
//             frequency,
//             speed,
//             insulation_class: insulationClass,
//             ingress_protection: ingressProtection,
//             operating_temperature_range: operatingTemperatureRange,
//         },
//     });

//     res.json({
//         id: newTechnicalSpecification.id_technical_specifications,
//         equipmentReference: newTechnicalSpecification.equipment_reference,
//     });
// });

// Get all technical specifications
// app.get("/technical-specifications", async (req, res) => {
//     const technicalSpecifications = await prisma.technicalSpecifications.findMany();
//     res.json(technicalSpecifications);
// });

// // Create a work order
// app.post("/work-orders", async (req, res) => {
//     const { idAsset, idUser, status, startDate, endDate } = req.body;

//     const newWorkOrder = await prisma.workOrders.create({
//         data: {
//             asset: { connect: { id_assets: idAsset } },
//             user: { connect: { id_users: idUser } },
//             status,
//             start_date: new Date(startDate),
//             end_date: new Date(endDate),
//         },
//     });

//     res.json({
//         id: newWorkOrder.id_work_order,
//         status: newWorkOrder.status,
//     });
// });

// Get all work orders
// app.get("/work-orders", async (req, res) => {
//     const workOrders = await prisma.workOrders.findMany({
//         include: { asset: true, user: true },
//     });

//     const simplifiedWorkOrders = workOrders.map(({ id_work_order, FK_id_asset, status }) => ({
//         id: id_work_order,
//         FKidAsset: FK_id_asset,
//         status,
//     }));
//     res.json({ workOrders: simplifiedWorkOrders });
// });

// // Create a notification
// app.post("/notifications", async (req, res) => {
//     const { idAsset, message } = req.body;

//     const newNotification = await prisma.notifications.create({
//         data: {
//             asset: { connect: { id_assets: idAsset } },
//             message,
//         },
//     });

//     res.json({
//         id: newNotification.id_notifications,
//         idAsset: newNotification.FK_id_assets,
//         message: newNotification.message,
//     });
// });

// // Get all notifications
// app.get("/notifications", async (req, res) => {
//     const notifications = await prisma.notifications.findMany({
//         include: { asset: true },
//     });
//     res.json(notifications);
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
