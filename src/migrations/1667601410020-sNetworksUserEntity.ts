import { MigrationInterface, QueryRunner } from "typeorm";

export class sNetworksUserEntity1667601410020 implements MigrationInterface {
    name = 'sNetworksUserEntity1667601410020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

}
