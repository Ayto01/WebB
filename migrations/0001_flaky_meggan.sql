CREATE TABLE `transactions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`amount` int unsigned NOT NULL,
	`date` datetime NOT NULL,
	`user_id` int unsigned NOT NULL,
	`appointment_id` int unsigned NOT NULL,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
