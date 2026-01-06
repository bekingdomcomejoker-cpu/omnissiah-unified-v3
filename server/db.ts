import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { InsertUser, users, resonanceLogs, InsertResonanceLog } from "../drizzle/schema";
import { ENV } from './_core/env';
import pg from 'pg';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (_db) return _db;
  
  if (!process.env.DATABASE_URL) {
    console.warn("[Database] No DATABASE_URL found in environment");
    return null;
  }

  try {
    console.log("[Database] Initializing pool...");
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    // Test connection
    await pool.query('SELECT 1');
    
    _db = drizzle(pool);
    console.log("[Database] Drizzle initialized and connection verified");
    return _db;
  } catch (error) {
    console.error("[Database] Connection failed:", error);
    return null;
  }
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
      role: user.role ?? 'user',
      lastSignedIn: user.lastSignedIn ?? new Date(),
    };

    if (user.name) values.name = user.name;
    if (user.email) values.email = user.email;
    if (user.loginMethod) values.loginMethod = user.loginMethod;

    if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: values.name,
        email: values.email,
        loginMethod: values.loginMethod,
        role: values.role,
        lastSignedIn: values.lastSignedIn,
        updatedAt: new Date(),
      }
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Log Resonance Pulse to Railway Anchor
 */
export async function logResonance(log: InsertResonanceLog): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(resonanceLogs).values(log);
  } catch (error) {
    console.error("[Database] Failed to log resonance:", error);
  }
}
