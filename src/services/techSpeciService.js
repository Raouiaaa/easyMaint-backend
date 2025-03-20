import prisma from "../config/db.js";

export const addTechSpeci = async (equipmentReference, manufacturer, ratedVoltage, ratedCurrent, ratedPower, frequency, speed, insulationClass, ingressProtection, operatingTemperatureRange) => {
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

        return newTechnicalSpecification;
};


export const getTechSpeci = async () => {
    return await prisma.technicalSpecifications.findMany();
};
