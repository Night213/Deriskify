import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCoordinatesAndRenamedStatusToPriority1750271991700 implements MigrationInterface {
    name = 'AddedCoordinatesAndRenamedStatusToPriority1750271991700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."report_status_enum"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "coordinates" geometry(Point,4326) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."report_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "priority" "public"."report_priority_enum" NOT NULL DEFAULT 'medium'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."report_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "coordinates"`);
        await queryRunner.query(`CREATE TYPE "public"."report_status_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "report" ADD "status" "public"."report_status_enum" NOT NULL DEFAULT 'medium'`);
    }

}
