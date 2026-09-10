CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text NOT NULL,
	`tenant` text NOT NULL,
	`kind` text NOT NULL,
	`status` text DEFAULT 'not_configured' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`code` text NOT NULL,
	`token_hash` text NOT NULL,
	`idempotency` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL,
	`adults` integer NOT NULL,
	`children` integer NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`allergies` text DEFAULT '' NOT NULL,
	`highchair` integer DEFAULT 0 NOT NULL,
	`occasion` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`internal_notes` text DEFAULT '' NOT NULL,
	`change_request` text DEFAULT '' NOT NULL,
	`status` text NOT NULL,
	`source` text NOT NULL,
	`privacy` integer NOT NULL,
	`marketing` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_reservations_code` ON `reservations` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_reservations_token` ON `reservations` (`token_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_reservations_idempotency` ON `reservations` (`tenant`,`idempotency`);--> statement-breakpoint
CREATE INDEX `idx_reservations_occupancy` ON `reservations` (`tenant`,`start`,`end`);--> statement-breakpoint
CREATE INDEX `idx_reservations_date` ON `reservations` (`tenant`,`date`);--> statement-breakpoint
CREATE TABLE `settings` (
	`tenant` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
