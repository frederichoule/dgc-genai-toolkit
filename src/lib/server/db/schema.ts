import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contentBlock = sqliteTable(
	'content_block',
	{
		slug: text('slug').notNull(),
		locale: text('locale').notNull(),
		body: text('body').notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date())
			.$onUpdateFn(() => new Date())
	},
	(t) => [primaryKey({ columns: [t.slug, t.locale] })]
);
