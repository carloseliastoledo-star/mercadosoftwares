-- Store-separated customers (backwards compatible)

-- 1) Add storeSlug column
ALTER TABLE `Customer` ADD COLUMN `storeSlug` VARCHAR(191) NULL;

-- 2) Backfill existing customers to legacy store (so new store starts empty)
UPDATE `Customer` SET `storeSlug` = 'casadosoftware' WHERE `storeSlug` IS NULL;

-- 3) Drop old unique index on email
DROP INDEX `Customer_email_key` ON `Customer`;

-- 4) Create new compound unique index
CREATE UNIQUE INDEX `Customer_email_storeSlug_key` ON `Customer`(`email`, `storeSlug`);
