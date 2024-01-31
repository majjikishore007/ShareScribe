import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706678660555 implements MigrationInterface {
    name = 'Migration1706678660555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "byuser"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "toUser"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "note"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "note" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "toUser" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "byuser" integer NOT NULL`);
    }

}
