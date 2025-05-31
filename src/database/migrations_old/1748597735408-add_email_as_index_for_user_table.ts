import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailAsIndexForUserTable1748597735408 implements MigrationInterface {
    name = 'AddEmailAsIndexForUserTable1748597735408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
    }

}
