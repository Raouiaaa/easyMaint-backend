import prisma from "../config/db.js";

export const addTechSpeci = async (req, res) => {
    try {
        const {
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
    
        const newTechnicalSpecification = await prisma.technicalSpecifications.create({
            data: {
                equipment_reference: equipmentReference,
                manufacturer,
                rated_voltage: ratedVoltage,
                rated_current: ratedCurrent,
                rated_power: ratedPower,
                frequency,
                speed,
                insulation_class: insulationClass,
                ingress_protection: ingressProtection,
                operating_temperature_range: operatingTemperatureRange,
            },
        });
    
        res.json({
            id: newTechnicalSpecification.id_technical_specifications,
            equipmentReference: newTechnicalSpecification.equipment_reference,
        });
    } catch (err) {
        console.log(err);
    }
};

// Get all technical specifications
export const getAllTechSpeci = async (req, res) => {
    try {
        const technicalSpecifications = await prisma.technicalSpecifications.findMany();
        res.json(technicalSpecifications);
    } catch (err) {
        console.log(err);
    }
};