CREATE TABLE `user_favorite_services` (
	`user_id` int unsigned NOT NULL,
	`service_id` int unsigned NOT NULL,
	CONSTRAINT `user_favorite_services_user_id_service_id_pk` PRIMARY KEY(`user_id`,`service_id`)
);
--> statement-breakpoint
ALTER TABLE `user_favorite_services` ADD CONSTRAINT `user_favorite_services_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_favorite_services` ADD CONSTRAINT `user_favorite_services_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE cascade ON UPDATE no action;