-- Add store separation fields (nullable for backwards compatibility)

ALTER TABLE `Order` ADD COLUMN `storeSlug` VARCHAR(191) NULL;
ALTER TABLE `Licenca` ADD COLUMN `storeSlug` VARCHAR(191) NULL;
