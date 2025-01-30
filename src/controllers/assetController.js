import prisma from "../config/db.js";

export const addAsset = async (req, res) => {
    try {
        const {
            name,
            location,
            category,
            installationDate,
            subCategory,
            maintenanceFrequencyInDays,
            fkTechnicalSpecificationsID,
        } = req.body;
    
        const newAsset = await prisma.assets.create({
            data: {
                name,
                location,
                category,
                installation_date: installationDate,
                sub_category: subCategory,
                maintenance_frequency_inDays: maintenanceFrequencyInDays,
                technicalSpecifications: fkTechnicalSpecificationsID
                    ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
                    : undefined,
            },
        });
    
        res.json({
            id: newAsset.id_assets,
            name: newAsset.name,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getAllAssets = async (req, res) => {
    try{
        const assets = await prisma.assets.findMany({
            include: { technicalSpecifications: true },
        });
        const simplifiedAssets = assets.map(({ id_assets, name, location }) => ({
            id: id_assets,
            name,
            location,
        }));
        res.json({ assets: simplifiedAssets });
    } catch (err) {
        console.log(err);
    }
};

// updating an asset
export const updateAsset = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {
            name,
            location,
            category,
            installationDate,
            subCategory,
            maintenanceFrequencyInDays,
            fkTechnicalSpecificationsID,
        } = req.body;
    
        const updatedAsset = await prisma.assets.update({
            where: { id_assets: id },
            data: {
                name,
                location,
                category,
                installation_date: installationDate,
                sub_category: subCategory,
                maintenance_frequency_inDays: maintenanceFrequencyInDays,
                technicalSpecifications: fkTechnicalSpecificationsID
                    ? { connect: { id_technical_specifications: fkTechnicalSpecificationsID } }
                    : undefined,
            },
        });
        
        res.json(updatedAsset);
    } catch (error) {
        console.log(error);
    }
};


