import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1712827793684 implements MigrationInterface {
    name = 'CreateTable1712827793684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`family_name\` varchar(255) NOT NULL, \`date_of_birth\` date NULL, \`date_of_death\` date NULL, \`name\` varchar(255) NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_instance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imprint\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`due_back\` date NULL, \`url\` varchar(255) NULL, \`book_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`isbn\` varchar(255) NULL, \`url\` varchar(255) NULL, \`author_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_genres_genre\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_31d658e0af554165f4598158c5\` (\`bookId\`), INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD CONSTRAINT \`FK_cdd368951566cce982e6e7b412f\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_24b753b0490a992a6941451f405\` FOREIGN KEY (\`author_id\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_31d658e0af554165f4598158c55\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_83bd32782d44d9db3d68c3f58c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_83bd32782d44d9db3d68c3f58c1\``);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_31d658e0af554165f4598158c55\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_24b753b0490a992a6941451f405\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP FOREIGN KEY \`FK_cdd368951566cce982e6e7b412f\``);
        await queryRunner.query(`DROP INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_31d658e0af554165f4598158c5\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`book_instance\``);
        await queryRunner.query(`DROP TABLE \`author\``);
    }

}
