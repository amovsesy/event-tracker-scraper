import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable(
	'user',
	{
		id: integer('id').primaryKey(),
		email: text('email').notNull().unique(),
		loginExternalId: text('login_external_id').notNull().unique(),
		paymentExternalId: text('payment_external_id').notNull(),
		active: integer('active', { mode: 'boolean' }).notNull().default(true),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull(),
		deletedAt: text('deleted_at'),
	},
	(table) => [index('external_id_idx').on(table.loginExternalId), index('email_idx').on(table.email)],
);

export const event = sqliteTable(
	'event',
	{
		id: integer('id').primaryKey(),
		url: text('url').notNull().unique(),
		data: text('data'),
		eventDate: text('eventDate'),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull(),
	},
	(table) => [index('url_idx').on(table.url)],
);

export const trackedEvent = sqliteTable(
	'tracked_event',
	{
		id: integer('id').primaryKey(),
		eventId: text('event_id')
			.notNull()
			.references(() => event.id),
		userId: text('data').references(() => user.id),
		price: integer('price').notNull(),
		sections: text('sections').notNull(),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull(),
	},
	(table) => [index('event_id_idx').on(table.eventId), index('user_id_idx').on(table.userId)],
);

export const trackedEventPrice = sqliteTable(
	'tracked_event_price',
	{
		id: integer('id').primaryKey(),
		eventId: text('event_id')
			.notNull()
			.references(() => event.id),
		section: text('section').notNull(),
		price: integer('price').notNull(),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull(),
	},
	(table) => [index('trk_evt_prc_event_section_idx').on(table.eventId, table.section)],
);

export const trackedEventNotification = sqliteTable(
	'tracked_event_notification',
	{
		id: integer('id').primaryKey(),
		trackedEventId: text('tracked_event_id')
			.notNull()
			.references(() => trackedEvent.id),
		trackedEventPriceId: text('tracked_event_price_id')
			.notNull()
			.references(() => trackedEventPrice.id),
		userId: text('user_id').notNull(),
		createdAt: text('created_at').notNull(),
		updatedAt: text('updated_at').notNull(),
	},
	(table) => [index('trk_evt_not_user_id_idx').on(table.userId)],
);
