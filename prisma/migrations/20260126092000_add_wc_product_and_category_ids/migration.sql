-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `wcProductId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Categoria` ADD COLUMN `wcCategoryId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Produto_wcProductId_key` ON `Produto`(`wcProductId`);

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_wcCategoryId_key` ON `Categoria`(`wcCategoryId`);
