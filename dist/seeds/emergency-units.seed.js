"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emergency_unit_entity_1 = require("../emergency-unit/entities/emergency-unit.entity");
const argon2 = require("argon2");
const data_source_1 = require("../lib/configs/db/data-source");
const argon2Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
};
async function hashPassword(password) {
    return await argon2.hash(password, argon2Options);
}
async function seedEmergencyUnits(dataSource) {
    try {
        await dataSource.initialize();
        console.log('Database connection initialized');
        const emergencyUnitRepository = dataSource.getRepository(emergency_unit_entity_1.EmergencyUnit);
        const defaultPassword = await hashPassword('Emergency@123');
        const emergencyUnits = [
            {
                username: 'ambulance',
                name: 'Ambulance Service',
                phone: '19999',
                password: defaultPassword,
                email: 'info@ambulance.eg',
                website: 'https://ambulance.eg',
                description: 'Emergency medical services providing urgent pre-hospital treatment and transportation to definitive care',
                icon: 'ambulance.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                    { coordinates: [30.0484, 31.2437] },
                ],
                isActive: true,
            },
            {
                username: 'firefighting',
                name: 'Firefighting Department',
                phone: '19998',
                password: defaultPassword,
                email: 'info@firefighting.eg',
                website: 'https://firefighting.eg',
                description: 'Fire and rescue services responsible for firefighting, fire prevention, and rescue operations',
                icon: 'firefighting.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                    { coordinates: [30.0484, 31.2437] },
                ],
                isActive: true,
            },
            {
                username: 'consumer_protection',
                name: 'Consumer Protection Agency',
                phone: '19997',
                password: defaultPassword,
                email: 'info@consumerprotection.eg',
                website: 'https://consumerprotection.eg',
                description: 'Agency responsible for protecting consumer rights and ensuring fair trade practices',
                icon: 'consumer_protection.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                ],
                isActive: true,
            },
            {
                username: 'tow_car',
                name: 'Tow Car Service',
                phone: '19996',
                password: defaultPassword,
                email: 'info@towcar.eg',
                website: 'https://towcar.eg',
                description: 'Vehicle recovery service providing towing and roadside assistance for stranded vehicles',
                icon: 'tow_car.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                    { coordinates: [30.0484, 31.2437] },
                    { coordinates: [30.0394, 31.2297] },
                ],
                isActive: true,
            },
            {
                username: 'traffic',
                name: 'Traffic Department',
                phone: '19995',
                password: defaultPassword,
                email: 'info@traffic.eg',
                website: 'https://traffic.eg',
                description: 'Department responsible for traffic management, road safety, and enforcement of traffic laws',
                icon: 'traffic.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                    { coordinates: [30.0484, 31.2437] },
                ],
                isActive: true,
            },
            {
                username: 'police',
                name: 'Police Department',
                phone: '19994',
                password: defaultPassword,
                email: 'info@police.eg',
                website: 'https://police.eg',
                description: 'Law enforcement agency responsible for maintaining public order and safety',
                icon: 'police.png',
                stations: [
                    { coordinates: [30.0444, 31.2357] },
                    { coordinates: [30.0594, 31.2197] },
                    { coordinates: [30.0484, 31.2437] },
                    { coordinates: [30.0394, 31.2297] },
                    { coordinates: [30.0544, 31.2157] },
                ],
                isActive: true,
            },
        ];
        const existingUnits = await emergencyUnitRepository.find({
            where: [
                { username: 'ambulance' },
                { username: 'firefighting' },
                { username: 'consumer_protection' },
                { username: 'tow_car' },
                { username: 'traffic' },
                { username: 'police' },
            ],
        });
        if (existingUnits.length > 0) {
            console.log(`Found ${existingUnits.length} existing emergency units. Skipping seed.`);
            console.log('Existing units:', existingUnits.map((unit) => unit.username).join(', '));
            return;
        }
        for (const unitData of emergencyUnits) {
            const unit = emergencyUnitRepository.create(unitData);
            await emergencyUnitRepository.save(unit);
            console.log(`Seeded emergency unit: ${unit.name}`);
        }
        console.log('Emergency units seeding completed successfully');
    }
    catch (error) {
        console.error('Error seeding emergency units:', error);
    }
    finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Database connection closed');
        }
    }
}
seedEmergencyUnits(data_source_1.default)
    .then(() => {
    console.log('Seed script execution completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('Seed script execution failed:', error);
    process.exit(1);
});
//# sourceMappingURL=emergency-units.seed.js.map