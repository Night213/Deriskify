import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialMigration1747099938921 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
