import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveResetTokenField1611182362772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users DROP COLUMN reset_token");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users ADD reset_token varchar(255)");
    } 

}
