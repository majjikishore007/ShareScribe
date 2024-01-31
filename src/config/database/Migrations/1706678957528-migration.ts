import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706678957528 implements MigrationInterface {
    name = 'Migration1706678957528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "toUserId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "noteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "noteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ALTER COLUMN "toUserId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
