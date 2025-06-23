"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstructionEntity1749500067277 = void 0;
class CreateInstructionEntity1749500067277 {
    name = 'CreateInstructionEntity1749500067277';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "instruction" ("id" SERIAL NOT NULL, "_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "emergencyUnitId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ead5edee6584b6e772ced595fc7" UNIQUE ("_id"), CONSTRAINT "PK_dd8def68dee37e3f878d0f8673a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_05e02d410dced601c705ccaf20a" FOREIGN KEY ("emergencyUnitId") REFERENCES "emergency_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_05e02d410dced601c705ccaf20a"`);
        await queryRunner.query(`DROP TABLE "instruction"`);
    }
}
exports.CreateInstructionEntity1749500067277 = CreateInstructionEntity1749500067277;
//# sourceMappingURL=1749500067277-CreateInstructionEntity.js.map