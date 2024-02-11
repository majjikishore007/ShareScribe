import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707635998057 implements MigrationInterface {
    name = 'Migration1707635998057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6"`);
        await queryRunner.query(`ALTER TABLE "shared_note" RENAME COLUMN "byuserId" TO "byUserId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_103e8150b71dd40a7b816447ef1" FOREIGN KEY ("byUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_103e8150b71dd40a7b816447ef1"`);
        await queryRunner.query(`ALTER TABLE "shared_note" RENAME COLUMN "byUserId" TO "byuserId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6" FOREIGN KEY ("byuserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
