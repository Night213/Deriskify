import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReportEntity1749886006562 implements MigrationInterface {
    name = 'CreateReportEntity1749886006562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."report_status_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "images" text NOT NULL, "status" "public"."report_status_enum" NOT NULL DEFAULT 'medium', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "emergencyUnitId" integer, CONSTRAINT "UQ_cd93c0cf862ba39498b100dadea" UNIQUE ("_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_0d5f7bb813868aec75c365b826f" FOREIGN KEY ("emergencyUnitId") REFERENCES "emergency_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_0d5f7bb813868aec75c365b826f"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TYPE "public"."report_status_enum"`);
    }

}
