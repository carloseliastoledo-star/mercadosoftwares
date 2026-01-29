-- AlterTable
SET @db := DATABASE();

SET @col1 := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = @db
    AND TABLE_NAME = 'Order'
    AND COLUMN_NAME = 'mercadoPagoPaymentTypeId'
);

SET @sql1 := IF(
  @col1 = 0,
  'ALTER TABLE `Order` ADD COLUMN `mercadoPagoPaymentTypeId` VARCHAR(191) NULL;',
  'SELECT 1;'
);

PREPARE stmt1 FROM @sql1;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

SET @col2 := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = @db
    AND TABLE_NAME = 'Order'
    AND COLUMN_NAME = 'mercadoPagoPaymentMethodId'
);

SET @sql2 := IF(
  @col2 = 0,
  'ALTER TABLE `Order` ADD COLUMN `mercadoPagoPaymentMethodId` VARCHAR(191) NULL;',
  'SELECT 1;'
);

PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;
