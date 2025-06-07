CREATE TABLE `event` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`data` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_url_unique` ON `event` (`url`);--> statement-breakpoint
CREATE INDEX `url_idx` ON `event` (`url`);--> statement-breakpoint
CREATE TABLE `tracked_event` (
	`id` integer PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`data` text,
	`price` integer NOT NULL,
	`sections` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`data`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `event_id_idx` ON `tracked_event` (`event_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `tracked_event` (`data`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`login_external_id` text NOT NULL,
	`payment_external_id` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_login_external_id_unique` ON `user` (`login_external_id`);--> statement-breakpoint
CREATE INDEX `external_id_idx` ON `user` (`login_external_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);