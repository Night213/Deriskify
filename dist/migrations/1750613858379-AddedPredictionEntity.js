"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedPredictionEntity1750613858379 = void 0;
class AddedPredictionEntity1750613858379 {
    name = 'AddedPredictionEntity1750613858379';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "predictions" ("id" SERIAL NOT NULL, "category" character varying(50) NOT NULL, "predictedPriority" integer NOT NULL, "imageName" character varying(255) NOT NULL, "imageUrl" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "emergencyUnitId" integer, CONSTRAINT "PK_b92c9e4db595214b289f5e28adc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "predictions" ADD CONSTRAINT "FK_cd3302a5d7d146da1e001ace2bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "predictions" ADD CONSTRAINT "FK_3b5a77ef749a6d1027a3ed50a89" FOREIGN KEY ("emergencyUnitId") REFERENCES "emergency_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "predictions" DROP CONSTRAINT "FK_3b5a77ef749a6d1027a3ed50a89"`);
        await queryRunner.query(`ALTER TABLE "predictions" DROP CONSTRAINT "FK_cd3302a5d7d146da1e001ace2bd"`);
        await queryRunner.query(`DROP TABLE "predictions"`);
    }
}
exports.AddedPredictionEntity1750613858379 = AddedPredictionEntity1750613858379;
//# sourceMappingURL=1750613858379-AddedPredictionEntity.js.map