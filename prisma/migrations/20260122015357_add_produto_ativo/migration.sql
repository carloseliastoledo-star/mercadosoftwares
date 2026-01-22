-- AlterTable
ALTER TABLE `Pagina` ALTER COLUMN `atualizadoEm` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `tutorialConteudo` TEXT NULL,
    ADD COLUMN `tutorialSubtitulo` VARCHAR(191) NULL,
    ADD COLUMN `tutorialTitulo` VARCHAR(191) NULL;
