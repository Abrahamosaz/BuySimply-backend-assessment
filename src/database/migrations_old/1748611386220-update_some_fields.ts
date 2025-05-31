import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeFields1748611386220 implements MigrationInterface {
    name = 'UpdateSomeFields1748611386220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d6c64183940864565643e9277a9"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "assignedTo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'todo'`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d6c64183940864565643e9277a9" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d6c64183940864565643e9277a9"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "assignedTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d6c64183940864565643e9277a9" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
