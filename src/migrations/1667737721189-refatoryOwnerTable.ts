import { MigrationInterface, QueryRunner } from "typeorm";

export class refatoryOwnerTable1667737721189 implements MigrationInterface {
    name = 'refatoryOwnerTable1667737721189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5"`);
    }

}
