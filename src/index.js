import express from "express";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import techSpeciRoutes from "./routes/techSpeciRoutes.js";
// const assetRoutes = require('./routes/assetRoutes');
// const workOrderRoutes = require('./routes/workOrderRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/users/login', userRoutes);
app.use('/api/users/users-filtered', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/assets/update-asset', assetRoutes);
app.use('/api/technical-specifications', techSpeciRoutes);
// app.use('/api/workorders', workOrderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;
