"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs = require("fs");
const seedsDir = __dirname;
const seedFiles = fs
    .readdirSync(seedsDir)
    .filter((file) => file.endsWith('.seed.ts') && file !== 'index.ts');
console.log(`Found ${seedFiles.length} seed files to run`);
async function runSeedFile(file) {
    return new Promise((resolve, reject) => {
        console.log(`Running seed file: ${file}`);
        const seedProcess = (0, child_process_1.spawn)('ts-node', ['-r', 'tsconfig-paths/register', path.join(seedsDir, file)], {
            stdio: 'inherit',
            shell: true,
        });
        seedProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`Seed file ${file} completed successfully`);
                resolve();
            }
            else {
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
async function runAllSeeds() {
    try {
        for (const file of seedFiles) {
            await runSeedFile(file);
        }
        console.log('All seed files completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error running seed files:', error);
        process.exit(1);
    }
}
runAllSeeds();
//# sourceMappingURL=index.js.map