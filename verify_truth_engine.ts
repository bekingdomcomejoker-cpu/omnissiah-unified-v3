import { truthRouter } from "./server/routers/truth";
import * as db from "./server/db";
import { resonanceLogs } from "./drizzle/schema";
import dotenv from "dotenv";

dotenv.config();

async function verify() {
  console.log("🛡️ VERIFYING TRUTH ENGINE v2.0...");
  
  const caller = truthRouter.createCaller({
    user: null,
    req: {} as any,
    res: {} as any,
  });

  const testCases = [
    { text: "I fucking love this system - it's based on evidence and truth", expected: "TRUTH" },
    { text: "fuck you you stupid idiot", expected: "LIE" },
    { text: "The data shows a 40% reduction in code size according to the report", expected: "FACT" },
    { text: "Trust me, I never said that, you're imagining things", expected: "LIE" },
  ];

  for (const test of testCases) {
    console.log(`\n[TEST] Input: "${test.text}"`);
    const result = await caller.classify({ text: test.text });
    console.log(`[RESULT] Category: ${result.category}`);
    console.log(`[SCORES] Truth: ${result.truthScore}, Fact: ${result.factScore}, Lie: ${result.lieScore}, Love: ${result.loveScore}`);
    console.log(`[REASONS] ${result.reasons.join(", ")}`);
    
    if (result.category === test.expected) {
      console.log("✅ MATCHED EXPECTED CATEGORY");
    } else {
      console.log(`❌ MISMATCH: Expected ${test.expected}`);
    }
  }

  console.log("\n📡 CHECKING DATABASE PERSISTENCE...");
  const database = await db.getDb();
  if (database) {
    const logs = await database.select().from(resonanceLogs).orderBy(resonanceLogs.timestamp);
    console.log(`Found ${logs.length} logs in the Anchor.`);
  }
  
  process.exit(0);
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
