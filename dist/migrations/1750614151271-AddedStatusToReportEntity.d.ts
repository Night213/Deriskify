import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedStatusToReportEntity1750614151271 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
