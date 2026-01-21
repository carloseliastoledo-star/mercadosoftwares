-- Add emailEnviadoEm to Order to prevent duplicate license email sends
ALTER TABLE `Order` ADD COLUMN `emailEnviadoEm` DATETIME NULL;
