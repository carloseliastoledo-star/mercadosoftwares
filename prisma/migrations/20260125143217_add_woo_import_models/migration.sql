-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `wcCustomerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `WooImportState` (
    `key` VARCHAR(191) NOT NULL,
    `resource` VARCHAR(191) NOT NULL,
    `after` DATETIME(0) NULL,
    `nextPage` INTEGER NOT NULL DEFAULT 1,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WooOrder` (
    `id` VARCHAR(191) NOT NULL,
    `wcOrderId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `total` DOUBLE NULL,
    `currency` VARCHAR(191) NULL,
    `criadoEm` DATETIME(0) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `WooOrder_wcOrderId_key`(`wcOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WooOrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `total` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WooOrder` ADD CONSTRAINT `WooOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WooOrderItem` ADD CONSTRAINT `WooOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `WooOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
