import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedCoordinatesAndRenamedStatusToPriority1750271991700 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
