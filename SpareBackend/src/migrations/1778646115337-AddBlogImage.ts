import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogImage1778646115337 implements MigrationInterface {
    name = 'AddBlogImage1778646115337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" ALTER COLUMN "imageUrl" SET DEFAULT 'https://res.cloudinary.com/dp7ksf2mb/image/upload/v1778646031/hono-blogs/megkqx973uyqoh9k07tx.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" ALTER COLUMN "imageUrl" DROP DEFAULT`);
    }

}
