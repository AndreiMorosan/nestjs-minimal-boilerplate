import { MigrationInterface, QueryRunner } from "typeorm";

export class UserConfig1742768014620 implements MigrationInterface {
    name = 'UserConfig1742768014620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_d716513bed35045a710424416db" PRIMARY KEY ("user_id", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_d716513bed35045a710424416db"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_c4f9a7bd77b489e711277ee5986" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
    }

}
