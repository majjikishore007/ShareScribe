import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706679004808 implements MigrationInterface {
    name = 'Migration1706679004808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "byuserId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6" FOREIGN KEY ("byuserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "byuserId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6" FOREIGN KEY ("byuserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
