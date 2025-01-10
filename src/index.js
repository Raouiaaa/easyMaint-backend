const express = require('express');
const userRoutes = require('./routes/userRoutes');
// const assetRoutes = require('./routes/assetRoutes');
// const workOrderRoutes = require('./routes/workOrderRoutes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/assets', assetRoutes);
// app.use('/api/workorders', workOrderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;
