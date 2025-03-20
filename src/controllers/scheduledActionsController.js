import { getActions } from "../services/actionService.js";
import { getScheduledActions } from "../services/scheduledActionsService.js";


// get all scheduled actions  
export const getAllScheduledActions = async (req, res) => {
    try {
        const scheduledActions = await getScheduledActions();
        const actions = await getActions();

        const listOfScheduledActions = scheduledActions.map((action) => {
            const assetName = action.asset?.name;
            const IDsubCategory = action.asset?.FK_subCategory_id;
            const date = action.dynamicDate;

            // Getting descriptions of actions related to a specific subCategory
            const descriptionsOfActions = actions
                .filter((item) => item.subCategory?.id_sub === IDsubCategory)
                .map((item) => item.description); // Extract only descriptions

            return {
                reference : assetName,
                date: date.toISOString().split('T')[0], // Format to YYYY-MM-DD
                descriptionsOfActions : descriptionsOfActions
            };
        });


        // const formattedScheduledActions = scheduledActions.map((action) => {
        //     const assetName = action.asset?.name;
        //     const IDsubCategory = action.asset?.FK_subCategory_id;


        //     // Getting descriptions of actions related to a specific subCategory
        //     const descriptionsOfActions = actions
        //         .filter((item) => item.subCategory?.id_sub === IDsubCategory) // Correct filtering
        //         .map((item) => item.description); // Extract only descriptions

        //     return {
        //         assetName : assetName,
        //         Date: baseDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        //         descriptionsOfActions : descriptionsOfActions
        //     };
        // });

        return res.json(listOfScheduledActions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};
