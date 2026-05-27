import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleEnum1778490895580 implements MigrationInterface {
    name = 'AddRoleEnum1778490895580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
    }

}
