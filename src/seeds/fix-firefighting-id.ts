// This script will update the 'firefighting' emergency unit to have id=2 if it does not already exist, or create it if missing.
// Usage: npx ts-node src/seeds/fix-firefighting-id.ts

import { DataSource } from 'typeorm';
import dataSource from '../lib/configs/db/data-source';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';

async function fixFirefightingUnit() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(EmergencyUnit);

  // Try to find the unit by username
  let unit = await repo.findOne({ where: { username: 'firefighting' } });

  if (unit) {
    if (unit.id !== 2) {
      // If exists but id is not 2, update it (dangerous if id=2 is taken!)
      const existing2 = await repo.findOne({ where: { id: 2 } });
      if (!existing2) {
        unit.id = 2;
        await repo.save(unit);
        console.log('Updated firefighting unit to id=2');
      } else {
        console.log('id=2 is already taken by another unit.');
      }
    } else {
      console.log('Firefighting unit already has id=2');
    }
  } else {
    // Create new unit with id=2
    const newUnit = repo.create({
      id: 2,
      username: 'firefighting',
      name: 'Firefighting Department',
      phone: '19998',
      password: 'Emergency@123', // You may want to hash this
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
  await dataSource.destroy();
}

fixFirefightingUnit().catch(console.error);
