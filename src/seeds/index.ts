/**
 * Main seed file that runs all seed scripts
 * Run with: npx ts-node src/seeds/index.ts
 */

import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

// Get all seed files except this index file
const seedsDir = __dirname;
const seedFiles = fs
  .readdirSync(seedsDir)
  .filter((file) => file.endsWith('.seed.ts') && file !== 'index.ts');

console.log(`Found ${seedFiles.length} seed files to run`);

// Function to run a seed file
async function runSeedFile(file: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Running seed file: ${file}`);

    const seedProcess = spawn(
      'ts-node',
      ['-r', 'tsconfig-paths/register', path.join(seedsDir, file)],
      {
        stdio: 'inherit',
        shell: true,
      },
    );

    seedProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`Seed file ${file} completed successfully`);
        resolve();
      } else {
        console.error(`Seed file ${file} failed with code ${code}`);
        reject(new Error(`Seed file ${file} failed with code ${code}`));
      }
    });

    seedProcess.on('error', (err) => {
      console.error(`Error running seed file ${file}:`, err);
      reject(err);
    });
  });
}

// Run all seed files sequentially
async function runAllSeeds() {
  try {
    for (const file of seedFiles) {
      await runSeedFile(file);
    }
    console.log('All seed files completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seed files:', error);
    process.exit(1);
  }
}

// Run the seeds
runAllSeeds();
