CREATE TABLE `appointments` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int unsigned NOT NULL,
	`service_id` int unsigned NOT NULL,
	`start_at` datetime NOT NULL,
	`end_at` datetime NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`duration_service` int unsigned NOT NULL,
	`price` int unsigned NOT NULL,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `time_off` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`start_at` datetime NOT NULL,
	`end_at` datetime NOT NULL,
	`reason` varchar(255) NOT NULL,
	CONSTRAINT `time_off_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `work_hours` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`weekday` int unsigned NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	CONSTRAINT `work_hours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE restrict ON UPDATE no action;