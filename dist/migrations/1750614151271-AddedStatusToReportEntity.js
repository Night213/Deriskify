"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedStatusToReportEntity1750614151271 = void 0;
class AddedStatusToReportEntity1750614151271 {
    name = 'AddedStatusToReportEntity1750614151271';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."report_status_enum" AS ENUM('ACTIVE', 'ACCEPTED')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "status" "public"."report_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."report_status_enum"`);
    }
}
exports.AddedStatusToReportEntity1750614151271 = AddedStatusToReportEntity1750614151271;
//# sourceMappingURL=1750614151271-AddedStatusToReportEntity.js.map