import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStatusToReportEntity1750614151271 implements MigrationInterface {
    name = 'AddedStatusToReportEntity1750614151271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."report_status_enum" AS ENUM('ACTIVE', 'ACCEPTED')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "status" "public"."report_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."report_status_enum"`);
    }

}
