import { eq, desc, and, gte, lte } from "drizzle-orm";
import {
  trinodeQueries,
  trinodeResponses,
  lambdaHistory,
  consensusResults,
  preprogrammedNodes,
  analyticsExports,
  type InsertTrinodeQuery,
  type InsertTrinodeResponse,
  type InsertLambdaHistoryRecord,
  type InsertConsensusResult,
  type InsertPreprogrammedNode,
  type InsertAnalyticsExport,
} from "../drizzle/schema";
import { getDb } from "./db";

export async function storeQuery(userId: number, query: string, queryType: "reflex" | "oracle" | "warfare" | "consensus") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(trinodeQueries).values({ userId, query, queryType });
}

export async function storeResponse(queryId: number, node: "reflex" | "oracle" | "warfare", response: string, lambda: number, responseTime: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(trinodeResponses).values({ queryId, node, response, lambda: lambda.toString(), responseTime });
}

export async function storeLambda(queryId: number | null, lambda: number, stage: "DORMANT" | "RESISTANCE" | "VERIFICATION" | "RECOGNITION" | "AWAKENED") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(lambdaHistory).values({ queryId, lambda: lambda.toString(), stage });
}

export async function storeConsensus(queryId: number, reflexResponse: string, oracleResponse: string, warfareResponse: string, consensusResult: string, lambda: number, isAwakened: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(consensusResults).values({ queryId, reflexResponse, oracleResponse, warfareResponse, consensusResult, lambda: lambda.toString(), isAwakened });
}

export async function getLambdaHistoryForUser(userId: number, limit: number = 100, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions = [eq(trinodeQueries.userId, userId)];
  if (startDate && endDate) {
    conditions.push(gte(lambdaHistory.timestamp, startDate));
    conditions.push(lte(lambdaHistory.timestamp, endDate));
  }
  return await db.select({ lambda: lambdaHistory.lambda, stage: lambdaHistory.stage, timestamp: lambdaHistory.timestamp })
    .from(lambdaHistory)
    .innerJoin(trinodeQueries, eq(lambdaHistory.queryId, trinodeQueries.id))
    .where(and(...conditions))
    .orderBy(desc(lambdaHistory.timestamp))
    .limit(limit);
}

export async function getQueriesForUser(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(trinodeQueries).where(eq(trinodeQueries.userId, userId)).orderBy(desc(trinodeQueries.createdAt)).limit(limit);
}

export async function getResponsesForQuery(queryId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(trinodeResponses).where(eq(trinodeResponses.queryId, queryId)).orderBy(trinodeResponses.createdAt);
}

export async function getConsensusForQuery(queryId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const results = await db.select().from(consensusResults).where(eq(consensusResults.queryId, queryId)).limit(1);
  return results[0] || null;
}

export async function createPreprogrammedNode(userId: number, name: string, nodeType: "reflex" | "oracle" | "warfare" | "consensus", systemPrompt: string, description?: string, parameters?: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(preprogrammedNodes).values({ userId, name, nodeType, systemPrompt, description, parameters });
}

export async function getPreprogrammedNodesForUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(preprogrammedNodes).where(and(eq(preprogrammedNodes.userId, userId), eq(preprogrammedNodes.isActive, true))).orderBy(preprogrammedNodes.createdAt);
}

export async function createAnalyticsExport(userId: number, exportName: string, exportType: "json" | "csv" | "metrics", startDate: string, endDate: string, recordCount: number, fileUrl?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(analyticsExports).values({ userId, exportName, exportType, dataRange: { startDate, endDate }, recordCount, fileUrl });
}

export async function getAnalyticsExportsForUser(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(analyticsExports).where(eq(analyticsExports.userId, userId)).orderBy(desc(analyticsExports.createdAt)).limit(limit);
}
