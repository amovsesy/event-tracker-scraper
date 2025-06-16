DROP INDEX `url_idx`;--> statement-breakpoint
CREATE INDEX `event_url_idx` ON `event` (`url`);--> statement-breakpoint
DROP INDEX `event_id_idx`;--> statement-breakpoint
DROP INDEX `user_id_idx`;--> statement-breakpoint
CREATE INDEX `tracked_event_event_id_idx` ON `tracked_event` (`event_id`);--> statement-breakpoint
CREATE INDEX `tracked_event_user_id_idx` ON `tracked_event` (`data`);--> statement-breakpoint
DROP INDEX `external_id_idx`;--> statement-breakpoint
DROP INDEX `email_idx`;--> statement-breakpoint
CREATE INDEX `user_external_id_idx` ON `user` (`login_external_id`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `user` (`email`);