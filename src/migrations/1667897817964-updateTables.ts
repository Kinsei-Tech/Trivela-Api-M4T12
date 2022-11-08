import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTables1667897817964 implements MigrationInterface {
    name = 'updateTables1667897817964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "isActive" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "isActive" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "isActive"`);
    }

}
