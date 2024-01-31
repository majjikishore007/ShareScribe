import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706678497832 implements MigrationInterface {
    name = 'Migration1706678497832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."shared_note_permission_enum" AS ENUM('read-only', 'read-write', 'owner')`);
        await queryRunner.query(`CREATE TABLE "shared_note" ("id" SERIAL NOT NULL, "byuser" integer NOT NULL, "toUser" integer NOT NULL, "note" integer NOT NULL, "permission" "public"."shared_note_permission_enum" NOT NULL DEFAULT 'read-only', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "byuserId" integer, "toUserId" integer, "noteId" integer, CONSTRAINT "PK_99c62b91170242dd70df9b7a28d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6" FOREIGN KEY ("byuserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_note" ADD CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_dc3a11d4963d12fc1594eaf5423"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_3543e1649e52d2355d5621bcd5b"`);
        await queryRunner.query(`ALTER TABLE "shared_note" DROP CONSTRAINT "FK_6bcb34a00309ec08629fc7cecb6"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`DROP TABLE "shared_note"`);
        await queryRunner.query(`DROP TYPE "public"."shared_note_permission_enum"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
