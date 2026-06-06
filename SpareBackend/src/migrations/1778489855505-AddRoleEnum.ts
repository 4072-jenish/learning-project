import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleEnum1778489855505 implements MigrationInterface {
    name = 'AddRoleEnum1778489855505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
