import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1667511548289 implements MigrationInterface {
    name = 'createTable1667511548289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target" boolean NOT NULL, "goalkeeper" boolean NOT NULL, "leftwing" boolean NOT NULL, "rightwing" boolean NOT NULL, "fixed" boolean NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL, "positions" integer NOT NULL, "usersId" uuid, "teamsId" uuid, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social networks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "linkedin" character varying, "whatsApp" character varying, "facebook" character varying, "tiktok" character varying, "instagram" character varying, CONSTRAINT "PK_cd24b1a9b28f5599743ec1811ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "age" integer NOT NULL, "height" integer NOT NULL, "weight" integer NOT NULL, "telephone" character varying NOT NULL, "isExercising" boolean NOT NULL, "urlImg" character varying NOT NULL, "socialNetworkId" uuid, "addressId" uuid, "positionsId" uuid, "requestId" uuid, "teamId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_eb49e62a36e9a66901b28504d1" UNIQUE ("socialNetworkId"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "REL_54144931128233282ab3bf7ef1" UNIQUE ("positionsId"), CONSTRAINT "REL_a20f12b66b835efd3e9cdc8efa" UNIQUE ("requestId"), CONSTRAINT "REL_d1803064187c8f38e57a9c4984" UNIQUE ("teamId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" integer NOT NULL, "teamsId" uuid, "usersId" uuid, CONSTRAINT "REL_2c6928902becf89437748914cb" UNIQUE ("usersId"), CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "maxWeight" integer, "maxAge" integer, "usersId" uuid, "fieldsId" uuid, "positionsId" uuid, "participantsId" uuid, CONSTRAINT "REL_3a123aba10ecd8e7e071e004bd" UNIQUE ("positionsId"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fields" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownersId" uuid, "adressesId" uuid, CONSTRAINT "REL_ce369917874b691538849a790f" UNIQUE ("adressesId"), CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_6e912f52513d3edc50f106778fb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_8853615eb49faeeae817889f0c5" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_eb49e62a36e9a66901b28504d13" FOREIGN KEY ("socialNetworkId") REFERENCES "social networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_54144931128233282ab3bf7ef16" FOREIGN KEY ("positionsId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a20f12b66b835efd3e9cdc8efa0" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d1803064187c8f38e57a9c4984c" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_434e93481b53d8007bcf8af8b9d" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_2c6928902becf89437748914cb0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_156b59646727c4d7370e17a3454" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_52bbf2d21bdcac200def516a69d" FOREIGN KEY ("fieldsId") REFERENCES "fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_3a123aba10ecd8e7e071e004bd6" FOREIGN KEY ("positionsId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_461b2f6f9be2df60f173a0230bc" FOREIGN KEY ("participantsId") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_d34442903fff451ea18518dbe1e" FOREIGN KEY ("ownersId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_ce369917874b691538849a790f7" FOREIGN KEY ("adressesId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_ce369917874b691538849a790f7"`);
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_d34442903fff451ea18518dbe1e"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_461b2f6f9be2df60f173a0230bc"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_3a123aba10ecd8e7e071e004bd6"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_52bbf2d21bdcac200def516a69d"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_156b59646727c4d7370e17a3454"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_2c6928902becf89437748914cb0"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_434e93481b53d8007bcf8af8b9d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d1803064187c8f38e57a9c4984c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a20f12b66b835efd3e9cdc8efa0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_54144931128233282ab3bf7ef16"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_eb49e62a36e9a66901b28504d13"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_8853615eb49faeeae817889f0c5"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_6e912f52513d3edc50f106778fb"`);
        await queryRunner.query(`DROP TABLE "fields"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "social networks"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}
