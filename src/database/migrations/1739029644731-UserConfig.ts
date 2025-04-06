import { MigrationInterface, QueryRunner } from "typeorm";

export class UserConfig1739029644731 implements MigrationInterface {
    name = 'UserConfig1739029644731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_settings" ("is_email_verified" boolean NOT NULL DEFAULT false, "is_phone_verified" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "PK_4ed056b9344e6f7d8d46ec4b302" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("user_id" uuid NOT NULL, "title" character varying, "description" text, CONSTRAINT "PK_c4f9a7bd77b489e711277ee5986" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
    }

}
