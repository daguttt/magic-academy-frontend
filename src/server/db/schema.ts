import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const todosTable = pgTable('todos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  completed: boolean('completed').notNull().default(false),
});
