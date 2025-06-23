"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../lib/configs/db/data-source");
const emergency_unit_entity_1 = require("../emergency-unit/entities/emergency-unit.entity");
async function fixFirefightingUnit() {
    await data_source_1.default.initialize();
    const repo = data_source_1.default.getRepository(emergency_unit_entity_1.EmergencyUnit);
    let unit = await repo.findOne({ where: { username: 'firefighting' } });
    if (unit) {
        if (unit.id !== 2) {
            const existing2 = await repo.findOne({ where: { id: 2 } });
            if (!existing2) {
                unit.id = 2;
                await repo.save(unit);
                console.log('Updated firefighting unit to id=2');
            }
            else {
                console.log('id=2 is already taken by another unit.');
            }
        }
        else {
            console.log('Firefighting unit already has id=2');
        }
    }
    else {
        const newUnit = repo.create({
            id: 2,
            username: 'firefighting',
            name: 'Firefighting Department',
            phone: '19998',
            password: 'Emergency@123',
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
        });
        await repo.save(newUnit);
        console.log('Created firefighting unit with id=2');
    }
    await data_source_1.default.destroy();
}
fixFirefightingUnit().catch(console.error);
//# sourceMappingURL=fix-firefighting-id.js.map