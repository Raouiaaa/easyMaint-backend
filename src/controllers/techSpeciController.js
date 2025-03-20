import {getTechSpeci} from "../services/techSpeciService.js";


// Get all technical specifications
export const getAllTechSpeci = async (req, res) => {
    try {
        const techSpecifications = await getTechSpeci();
        return res.json(techSpecifications);

    } catch (err) {
        console.error("Error fetching technical specifications:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};