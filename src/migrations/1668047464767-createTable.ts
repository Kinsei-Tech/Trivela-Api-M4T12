import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1668047464767 implements MigrationInterface {
    name = 'createTable1668047464767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fields" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "ownerId" uuid, "addressId" uuid, CONSTRAINT "UQ_712fd1134fa6faf74e09b0bd752" UNIQUE ("name"), CONSTRAINT "REL_c924581ed54ddae034f24955f8" UNIQUE ("addressId"), CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "target" boolean NOT NULL, "goalkeeper" boolean NOT NULL, "leftwing" boolean NOT NULL, "rightwing" boolean NOT NULL, "fixed" boolean NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social networks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "linkedin" character varying, "whatsApp" character varying, "facebook" character varying, "tiktok" character varying, "instagram" character varying, CONSTRAINT "PK_cd24b1a9b28f5599743ec1811ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "age" integer, "height" integer, "weight" integer, "telephone" character varying NOT NULL, "isExercising" boolean NOT NULL, "urlImg" character varying, "socialNetworkId" uuid, "addressId" uuid, "positionsId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_eb49e62a36e9a66901b28504d1" UNIQUE ("socialNetworkId"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "REL_54144931128233282ab3bf7ef1" UNIQUE ("positionsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL DEFAULT '1', "positions" integer NOT NULL, "userId" uuid, "teamsId" uuid, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "maxWeight" integer, "maxAge" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, "positionsId" uuid, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"), CONSTRAINT "REL_3a123aba10ecd8e7e071e004bd" UNIQUE ("positionsId"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, "teamId" uuid, CONSTRAINT "REL_5fc9cddc801b973cd9edcdda42" UNIQUE ("userId"), CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams_fields_fields" ("teamsId" uuid NOT NULL, "fieldsId" uuid NOT NULL, CONSTRAINT "PK_99630d0a9ebe12c7c793dee613f" PRIMARY KEY ("teamsId", "fieldsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eeb9f45ec38a70dc96234ab959" ON "teams_fields_fields" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a906e42264bcb3e8e9e871a992" ON "teams_fields_fields" ("fieldsId") `);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_a7d98ec4be2c842c6556188cfdc" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_c924581ed54ddae034f24955f83" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_eb49e62a36e9a66901b28504d13" FOREIGN KEY ("socialNetworkId") REFERENCES "social networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_54144931128233282ab3bf7ef16" FOREIGN KEY ("positionsId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_8853615eb49faeeae817889f0c5" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_5c5696b2c3c57698f890b2cbbdd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_3a123aba10ecd8e7e071e004bd6" FOREIGN KEY ("positionsId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_b5291286325dc7472d0b4c9e6dd" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams_fields_fields" ADD CONSTRAINT "FK_eeb9f45ec38a70dc96234ab9598" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_fields_fields" ADD CONSTRAINT "FK_a906e42264bcb3e8e9e871a9928" FOREIGN KEY ("fieldsId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams_fields_fields" DROP CONSTRAINT "FK_a906e42264bcb3e8e9e871a9928"`);
        await queryRunner.query(`ALTER TABLE "teams_fields_fields" DROP CONSTRAINT "FK_eeb9f45ec38a70dc96234ab9598"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_b5291286325dc7472d0b4c9e6dd"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_3a123aba10ecd8e7e071e004bd6"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_5c5696b2c3c57698f890b2cbbdd"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_8853615eb49faeeae817889f0c5"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_54144931128233282ab3bf7ef16"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_eb49e62a36e9a66901b28504d13"`);
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_c924581ed54ddae034f24955f83"`);
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_a7d98ec4be2c842c6556188cfdc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a906e42264bcb3e8e9e871a992"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eeb9f45ec38a70dc96234ab959"`);
        await queryRunner.query(`DROP TABLE "teams_fields_fields"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "social networks"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "fields"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
