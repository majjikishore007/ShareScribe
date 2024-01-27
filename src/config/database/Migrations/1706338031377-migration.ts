import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706338031377 implements MigrationInterface {
    name = 'Migration1706338031377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_46f1fd215bc812d65c223f24e6e"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "byuserIdId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "toUserIdId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_f14877fed4ba82f8223505df803" FOREIGN KEY ("byuserIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_b8407b3a69c6b93b1d2c2f2c124" FOREIGN KEY ("toUserIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_b8407b3a69c6b93b1d2c2f2c124"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_f14877fed4ba82f8223505df803"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "toUserIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "byuserIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_46f1fd215bc812d65c223f24e6e" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
