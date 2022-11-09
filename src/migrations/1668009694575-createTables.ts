import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1668009694575 implements MigrationInterface {
    name = 'createTables1668009694575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "isActive"`);
    }

}
