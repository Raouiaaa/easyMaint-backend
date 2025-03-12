import prisma from "../config/db.js";


// get all scheduled actions  
export const getAllScheduledActions = async (req, res) => {
    try {
        const scheduledActions = await prisma.scheduledActions.findMany({
            include: { asset: true, subCategory: true },
        });

        const actions = await prisma.actions.findMany({
            include: {subCategory: true },
        });

        const formattedScheduledActions = scheduledActions.map((action) => {
            const baseDate = new Date(action.dynamicDate);
            const assetName = action.asset?.name;
            const IDsubCategory = action.asset?.FK_subCategory_id;

            // Getting descriptions of actions related to a specific subCategory
            const descriptionsOfActions = actions
                .filter((item) => item.subCategory?.id_sub === IDsubCategory)
                .map((item) => item.description); // Extract only descriptions

            return {
                reference : assetName,
                date: baseDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
                descriptionsOfActions : descriptionsOfActions
            };
        });


        // const formattedScheduledActions = scheduledActions.map((action) => {
        //     const baseDate = new Date(action.dynamicDate);
        //     const maintenanceFrequency = action.asset?.maintenance_frequency_inDays || 0;
        //     const assetName = action.asset?.name;
        //     const IDsubCategory = action.asset?.FK_subCategory_id;

        //     // Function to calculate future maintenance dates
        //     const futureDates = [];
        //     for (let i = 1; i <= 5; i++) { // Store the next 5 maintenance dates
        //         const nextDate = new Date(baseDate);
        //         nextDate.setDate(baseDate.getDate() + i * maintenanceFrequency);
        //         futureDates.push(nextDate.toISOString().split('T')[0]); // Store as YYYY-MM-DD
        //     }

        //     // Getting descriptions of actions related to a specific subCategory
        //     const descriptionsOfActions = actions
        //         .filter((item) => item.subCategory?.id_sub === IDsubCategory) // Correct filtering
        //         .map((item) => item.description); // Extract only descriptions

        //     return {
        //         // ...action,
        //         assetName : assetName,
        //         dynamicDate: baseDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        //         // futureMaintenanceDates: futureDates, // Store next maintenance dates
        //         descriptionsOfActions : descriptionsOfActions
        //     };
        // });

        res.json({ scheduledActions: formattedScheduledActions });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};
