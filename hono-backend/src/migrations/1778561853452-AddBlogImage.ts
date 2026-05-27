import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogImage1778561853452 implements MigrationInterface {
    name = 'AddBlogImage1778561853452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "imageUrl"`);
    }

}
