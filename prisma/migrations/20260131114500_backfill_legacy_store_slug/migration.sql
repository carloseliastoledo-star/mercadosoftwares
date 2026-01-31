-- Backfill legacy data to casadosoftware store

UPDATE `Order` SET `storeSlug` = 'casadosoftware' WHERE `storeSlug` IS NULL;
UPDATE `Licenca` SET `storeSlug` = 'casadosoftware' WHERE `storeSlug` IS NULL;
