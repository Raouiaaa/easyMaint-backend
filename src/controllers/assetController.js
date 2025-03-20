import { addAsset, getAssets, updateAsset } from "../services/assetService.js";
import {addTechSpeci} from "../services/techSpeciService.js";
import {createScheduledAction} from "../services/scheduledActionsService.js";


export const createAsset = async (req, res) => {
    try {
        const {
            name,
            location,
            category,
            installationDate,
            maintenanceFrequencyInDays,
            fkSubCategoryID,
            equipmentReference,
            manufacturer,
            ratedVoltage,
            ratedCurrent,
            ratedPower,
            frequency,
            speed,
            insulationClass,
            ingressProtection,
            operatingTemperatureRange,
        } = req.body;

        const newTechSpeci = await addTechSpeci(
            equipmentReference, manufacturer, ratedVoltage, ratedCurrent,
            ratedPower, frequency, speed, insulationClass,
            ingressProtection, operatingTemperatureRange
        );

        // Create new asset and assign its FK_tech_speci to the ID of the newly created technical specification
        const newAsset = await addAsset(name, location, category, installationDate, maintenanceFrequencyInDays, newTechSpeci.id_technical_specifications, fkSubCategoryID);

        // Create the first scheduled action
        const initialScheduledAction = await createScheduledAction(newAsset.id_assets, fkSubCategoryID, new Date());

        // Generate additional scheduled actions dynamically
        const maintenanceFrequency = maintenanceFrequencyInDays;
        const baseDate = new Date(); // Start from today
        const currentYear = baseDate.getFullYear();
        const nextYear = currentYear + 1;

        let nextDate = new Date(baseDate);
        let scheduledActions = [initialScheduledAction];

        while (nextDate.getFullYear() < nextYear) {
            nextDate.setDate(nextDate.getDate() + maintenanceFrequency);

            if (nextDate.getFullYear() >= nextYear) break; // Stop at the end of this year

            const newAction = await createScheduledAction(newAsset.id_assets, fkSubCategoryID, new Date(nextDate));
            scheduledActions.push(newAction);
        }

        return res.status(201).json({ newAsset, newTechSpeci, scheduledActions });
    } catch (err) {
        console.error("Error in createAsset:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get all assets
export const getAllAssets = async (req, res) => {
    try {
        const assets = await getAssets();
        return res.json(assets);
    } catch (err) {
        console.error("Error in getAllAssets:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Updating an asset
export const updateAssets = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {
            name,
            location,
            category,
            installationDate,
            maintenanceFrequencyInDays,
            fkTechnicalSpecificationsID,
            fkSubCategoryID,
        } = req.body;

        const updatedAsset = await updateAsset(id, {
            name, location, category, installationDate, maintenanceFrequencyInDays,
            fkTechnicalSpecificationsID, fkSubCategoryID
        });

        return res.json(updatedAsset);
    } catch (error) {
        console.error("Error in updateAssets:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
