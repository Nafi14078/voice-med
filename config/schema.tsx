import { integer, pgTable, varchar, text, timestamp, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Updated Users Table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: text("clerk_id").notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: text("image_url"), 
  credits: integer().default(10),
  
  // New Stats Columns
  consultations: integer().default(0),
  reportCount: integer().default(0),
});

// 2. New Reports Table
export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Links to usersTable.clerkId
  title: varchar({ length: 255 }).notNull(),
  summary: text("summary"),
  disease: varchar({ length: 255 }),
  symptoms: text("symptoms"),
  medication: text("medication"),
  advice: text("advice"),
  urgency: varchar({ length: 50 }), // e.g., "Low", "Medium", "High"
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. Define Relations (Optional but recommended for easier queries)
export const usersRelations = relations(usersTable, ({ many }) => ({
  reports: many(reportsTable),
}));

export const reportsRelations = relations(reportsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [reportsTable.userId],
    references: [usersTable.clerkId],
  }),
}));