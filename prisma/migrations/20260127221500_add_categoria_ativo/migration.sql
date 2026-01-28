-- Add Categoria.ativo (default true)
ALTER TABLE `Categoria` ADD COLUMN `ativo` TINYINT(1) NOT NULL DEFAULT 1;
