"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedCoordinatesAndRenamedStatusToPriority1750271991700 = void 0;
class AddedCoordinatesAndRenamedStatusToPriority1750271991700 {
    name = 'AddedCoordinatesAndRenamedStatusToPriority1750271991700';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."report_status_enum"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "coordinates" geometry(Point,4326) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."report_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "priority" "public"."report_priority_enum" NOT NULL DEFAULT 'medium'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."report_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "coordinates"`);
        await queryRunner.query(`CREATE TYPE "public"."report_status_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "status" "public"."report_status_enum" NOT NULL DEFAULT 'medium'`);
    }
}
exports.AddedCoordinatesAndRenamedStatusToPriority1750271991700 = AddedCoordinatesAndRenamedStatusToPriority1750271991700;
//# sourceMappingURL=1750271991700-AddedCoordinatesAndRenamedStatusToPriority.js.map