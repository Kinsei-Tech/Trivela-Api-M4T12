import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnIsActive1667587211245 implements MigrationInterface {
    name = 'addColumnIsActive1667587211245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ADD "isActive" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "isActive"`);
    }

}
