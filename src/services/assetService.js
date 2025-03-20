import prisma from "../config/db.js";


export const addAsset = async (name, location, category, installationDate, maintenanceFrequencyInDays, fkTechnicalSpecificationsID, fkSubCategoryID) => {
        const newAsset = await prisma.assets.create({
            data: {
                name,
                location,
                category,
                installation_date: installationDate,
                maintenance_frequency_inDays: maintenanceFrequencyInDays,
                technicalSpecifications: fkTechnicalSpecificationsID
                    ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
                    : undefined,
                subCategory: fkSubCategoryID
                    ? { connect: { id_sub: fkSubCategoryID } }
                    : undefined,
            },
        });

        return newAsset;
};

export const getAssets = async () => {
    return await prisma.assets.findMany({
        include: {
            technicalSpecifications: true,
            subCategory: true,
        },
    });
};

export const updateAsset = async (id, name, location, category, installationDate, maintenanceFrequencyInDays, fkTechnicalSpecificationsID, fkSubCategoryID) => {
    const updatedAsset = await prisma.assets.update({
        where: { id_assets: id },
        data: {
                name,
                location,
                category,
                installation_date: installationDate,
                maintenance_frequency_inDays: maintenanceFrequencyInDays,
                technicalSpecifications: fkTechnicalSpecificationsID
                    ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
                    : undefined,
                subCategory: fkSubCategoryID
                    ? { connect: { id_sub: fkSubCategoryID } }
                    : undefined,
            },
        });

    return updatedAsset;

};
