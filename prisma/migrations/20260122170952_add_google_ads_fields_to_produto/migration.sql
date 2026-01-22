-- AlterTable
ALTER TABLE `Pagina` ALTER COLUMN `atualizadoEm` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `googleAdsConversionCurrency` VARCHAR(191) NULL,
    ADD COLUMN `googleAdsConversionLabel` VARCHAR(191) NULL,
    ADD COLUMN `googleAdsConversionValue` DOUBLE NULL;

-- AlterTable
ALTER TABLE `SiteSettings` ALTER COLUMN `updatedAt` DROP DEFAULT;
