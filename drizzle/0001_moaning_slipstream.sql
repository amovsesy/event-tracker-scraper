CREATE TABLE `tracked_event_notification` (
	`id` integer PRIMARY KEY NOT NULL,
	`tracked_event_id` text NOT NULL,
	`tracked_event_price_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`tracked_event_id`) REFERENCES `tracked_event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tracked_event_price_id`) REFERENCES `tracked_event_price`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `trk_evt_not_user_id_idx` ON `tracked_event_notification` (`user_id`);--> statement-breakpoint
CREATE TABLE `tracked_event_price` (
	`id` integer PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`section` text NOT NULL,
	`price` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `trk_evt_prc_event_section_idx` ON `tracked_event_price` (`event_id`,`section`);--> statement-breakpoint
ALTER TABLE `event` ADD `eventDate` text;