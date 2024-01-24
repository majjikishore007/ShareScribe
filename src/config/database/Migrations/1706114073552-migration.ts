import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706114073552 implements MigrationInterface {
    name = 'Migration1706114073552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_1088e4bbffbf895605c821a8684"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "sharedAt"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "sharedWithUserId"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "noteIdId" integer`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "permission"`);
        await queryRunner.query(`CREATE TYPE "public"."shared_note_permission_enum" AS ENUM('read-only', 'read-write', 'owner')`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "permission" "public"."shared_note_permission_enum" NOT NULL DEFAULT 'read-only'`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_1e125605dbffecd4afbb1b72e98" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_46f1fd215bc812d65c223f24e6e" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_bfbfacd4bfe675a97e4a137069a" FOREIGN KEY ("noteIdId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_bfbfacd4bfe675a97e4a137069a"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_46f1fd215bc812d65c223f24e6e"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_1e125605dbffecd4afbb1b72e98"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "permission"`);
        await queryRunner.query(`DROP TYPE "public"."shared_note_permission_enum"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "permission" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "noteIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "sharedWithUserId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "noteId" integer`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD "sharedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_1088e4bbffbf895605c821a8684" FOREIGN KEY ("sharedWithUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
