-- AlterTable
ALTER TABLE `Pagina`
  ADD COLUMN `showInFooter` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `footerOrder` INTEGER NULL;
