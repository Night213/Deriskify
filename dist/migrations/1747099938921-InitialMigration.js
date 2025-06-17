"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1747099938921 = void 0;
class InitialMigration1747099938921 {
    name = 'InitialMigration1747099938921';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_profile_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "birthDate" TIMESTAMP NOT NULL, "gender" "public"."user_profile_gender_enum" NOT NULL, "weight" smallint, "height" smallint, "address" character varying(255) NOT NULL, "city" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_51cb79b5555effaf7d69ba1cff" UNIQUE ("userId"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('EMERGENCY_UNIT', 'CLIENT')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userType" "public"."user_usertype_enum" NOT NULL DEFAULT 'CLIENT', "nationalId" character varying(14) NOT NULL, "fullName" character varying NOT NULL, "phone" character varying(11) NOT NULL, "password" character varying(128) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5e30ae7136bce1f6d80d9c0b72d" UNIQUE ("nationalId"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emergency_unit" ("id" SERIAL NOT NULL, "_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying, "website" character varying, "description" character varying NOT NULL, "icon" character varying NOT NULL, "stations" json NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_72c033bef2995c668a8ab4541ac" UNIQUE ("_id"), CONSTRAINT "UQ_92a85c4cf0cc175f5576a398846" UNIQUE ("username"), CONSTRAINT "PK_cf3897d838dbdda007586e6846a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`);
        await queryRunner.query(`DROP TABLE "emergency_unit"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_gender_enum"`);
    }
}
exports.InitialMigration1747099938921 = InitialMigration1747099938921;
//# sourceMappingURL=1747099938921-InitialMigration.js.map