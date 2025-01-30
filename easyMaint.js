import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

// POST - /api/users
app.post("/users", (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };
    users.push(newUser); // adding new user object to "users" table
    res.json({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
    });
});

app.post("/users/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
        res.json({
            message: "Authentication successful",
            id: foundUser.id,
            username: foundUser.username, // Return only non-sensitive data
            role: foundUser.role,
        });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

app.get("/users", (req, res) => {
    const simplifiedUsers = users.map(({ id, username, role }) => ({ // Loops through the users array and creates a new array, simplifiedUsers, containing objects with only the id, username, and role properties from each user.
        id,
        username,
        role,
    }));
    res.json({
        users: simplifiedUsers,
        success: true,
    });
});

// NEW Asset
app.post("/assets", (req, res) => {
    const newAsset = {
        id: assets.length + 1, // using length of the table 'users'
        name: req.body.name,
        location: req.body.location,
        category: req.body.category,
        installationDate: req.body.installationDate,
        subCategory: req.body.subCategory,
        maintenanceFrequencyInDays: req.body.maintenanceFrequencyInDays,
        fkTechnicalSpecificationsID: req.body.fkTechnicalSpecificationsID,
    };
    assets.push(newAsset); // adding new asset object to "assets" table
    res.json({
        id: newAsset.id,
        name: newAsset.name,
    });
});

app.get("/assets", (req, res) => {
    const simplifiedAssets = assets.map(({ id, name, location }) => ({
        id,
        name,
        location,
    }));
    res.json({assets: simplifiedAssets});
});

app.put("/assets/:id", (req, res) => {
    const id = parseInt(req.params.id); // converting the string to a number/integer - id we get from params is a string so we convert it
    const replacementAsset = {
        id: id, 
        name: req.body.name,
        location: req.body.location,
        category: req.body.category,
        installationDate: req.body.installationDate,
        subCategory: req.body.subCategory,
        maintenanceFrequencyInDays: req.body.maintenanceFrequencyInDays,
        fkTechnicalSpecificationsID: req.body.fkTechnicalSpecificationsID,
    };
    const searchIndex = assets.findIndex((asset) => asset.id === id);
    assets[searchIndex] = replacementAsset;
    res.json(replacementAsset);
});

app.post("/technical-specifications", (req, res) => {
    const newTechnicalSpecifications = {
        id: technicalSpecifications.length + 1, // using length of the table 'tech-specifications'
        equipmentReference: req.body.equipmentReference,
        manufacturer: req.body.manufacturer,
        ratedVoltage: req.body.ratedVoltage,
        ratedCurrent: req.body.ratedCurrent,
        ratedPower: req.body.ratedPower,
        frequency: req.body.frequency,
        speed: req.body.speed,
        insulationClass: req.body.insulationClass,
        ingressProtection: req.body.ingressProtection,
        operatingTemperatureRange: req.body.operatingTemperatureRange,
    };
    technicalSpecifications.push(newTechnicalSpecifications); // adding new asset object to "tech-specifications" table
    res.json({
        id: newTechnicalSpecifications.id,
        equipmentReference: newTechnicalSpecifications.equipmentReference,
    });
});

app.get("/technical-specifications", (req,res) => {
    res.json(technicalSpecifications);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

