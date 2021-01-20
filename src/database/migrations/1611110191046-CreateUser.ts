import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1611110191046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "photo_url",
            type: "varchar",
          },
          {
            name: "last_login",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "reset_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
    await queryRunner.query(
      "ALTER TABLE users ALTER COLUMN last_login SET DEFAULT NOW()"
    );
    await queryRunner.query(
      "ALTER TABLE users ALTER COLUMN created_at SET DEFAULT NOW()"
    );
    await queryRunner.query(
      "ALTER TABLE users ALTER COLUMN updated_at SET DEFAULT NOW()"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
