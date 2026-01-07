import { integer, pgEnum, pgTable, text, timestamp, varchar, jsonb, boolean, decimal } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Resonance Logs Table
 * Anchors the 1.67x Heartbeat history in the Railway cloud
 */
export const resonanceLogs = pgTable("resonance_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  lambda: text("lambda").notNull(),
  resonance: text("resonance").notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  covenant: varchar("covenant", { length: 64 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  socketId: varchar("socketId", { length: 64 }),
});

export type ResonanceLog = typeof resonanceLogs.$inferSelect;
export type InsertResonanceLog = typeof resonanceLogs.$inferInsert;

/**
 * TriNode Query Storage
 */
export const queryTypeEnum = pgEnum("query_type", ["reflex", "oracle", "warfare", "consensus"]);

export const trinodeQueries = pgTable("trinode_queries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  query: text("query").notNull(),
  queryType: queryTypeEnum("queryType").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TrinodeQuery = typeof trinodeQueries.$inferSelect;
export type InsertTrinodeQuery = typeof trinodeQueries.$inferInsert;

/**
 * TriNode Response Storage
 */
export const nodeTypeEnum = pgEnum("node_type", ["reflex", "oracle", "warfare"]);

export const trinodeResponses = pgTable("trinode_responses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  queryId: integer("queryId").notNull(),
  node: nodeTypeEnum("node").notNull(),
  response: text("response").notNull(),
  lambda: decimal("lambda", { precision: 5, scale: 4 }).notNull(),
  responseTime: integer("responseTime").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrinodeResponse = typeof trinodeResponses.$inferSelect;
export type InsertTrinodeResponse = typeof trinodeResponses.$inferInsert;

/**
 * Lambda History
 */
export const stageEnum = pgEnum("stage", ["DORMANT", "RESISTANCE", "VERIFICATION", "RECOGNITION", "AWAKENED"]);

export const lambdaHistory = pgTable("lambda_history", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  queryId: integer("queryId"),
  lambda: decimal("lambda", { precision: 5, scale: 4 }).notNull(),
  stage: stageEnum("stage").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type LambdaHistoryRecord = typeof lambdaHistory.$inferSelect;
export type InsertLambdaHistoryRecord = typeof lambdaHistory.$inferInsert;

/**
 * Consensus Results
 */
export const consensusResults = pgTable("consensus_results", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  queryId: integer("queryId").notNull(),
  reflexResponse: text("reflexResponse").notNull(),
  oracleResponse: text("oracleResponse").notNull(),
  warfareResponse: text("warfareResponse").notNull(),
  consensusResult: text("consensusResult").notNull(),
  lambda: decimal("lambda", { precision: 5, scale: 4 }).notNull(),
  isAwakened: boolean("isAwakened").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConsensusResult = typeof consensusResults.$inferSelect;
export type InsertConsensusResult = typeof consensusResults.$inferInsert;

/**
 * Pre-programmed Nodes
 */
export const preprogrammedNodes = pgTable("preprogrammed_nodes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  nodeType: queryTypeEnum("nodeType").notNull(),
  systemPrompt: text("systemPrompt").notNull(),
  parameters: jsonb("parameters").$type<{
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
  }>(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PreprogrammedNode = typeof preprogrammedNodes.$inferSelect;
export type InsertPreprogrammedNode = typeof preprogrammedNodes.$inferInsert;

/**
 * Analytics Export Records
 */
export const exportTypeEnum = pgEnum("export_type", ["json", "csv", "metrics"]);

export const analyticsExports = pgTable("analytics_exports", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  exportName: varchar("exportName", { length: 255 }).notNull(),
  exportType: exportTypeEnum("exportType").notNull(),
  dataRange: jsonb("dataRange").$type<{
    startDate: string;
    endDate: string;
  }>(),
  recordCount: integer("recordCount").notNull(),
  fileUrl: varchar("fileUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnalyticsExport = typeof analyticsExports.$inferSelect;
export type InsertAnalyticsExport = typeof analyticsExports.$inferInsert;
