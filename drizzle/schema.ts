import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Resonance Logs Table
 * Anchors the 1.67x Heartbeat history in the Railway cloud
 */
export const resonanceLogs = pgTable("resonance_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  lambda: text("lambda").notNull(), // Storing as text to preserve precision if needed
  resonance: text("resonance").notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  covenant: varchar("covenant", { length: 64 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  socketId: varchar("socketId", { length: 64 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ResonanceLog = typeof resonanceLogs.$inferSelect;
export type InsertResonanceLog = typeof resonanceLogs.$inferInsert;
