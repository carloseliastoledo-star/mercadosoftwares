-- Drop unique index on Licenca.chave to allow duplicate license keys
ALTER TABLE `Licenca` DROP INDEX `Licenca_chave_key`;
