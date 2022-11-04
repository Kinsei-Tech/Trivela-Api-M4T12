import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1667584446849 implements MigrationInterface {
    name = 'createTable1667584446849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
