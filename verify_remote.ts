import { getDb } from './server/db';
import { resonanceLogs } from './drizzle/schema';

async function check() {
  console.log('📡 Connecting to Railway Anchor...');
  const db = await getDb();
  if (!db) {
    console.error('❌ Failed to connect to database');
    process.exit(1);
  }

  console.log('🔍 Querying resonance_logs...');
  const logs = await db.select().from(resonanceLogs).limit(10);
  
  console.log('--- REMOTE RESONANCE LOGS ---');
  console.log(JSON.stringify(logs, null, 2));
  console.log('-----------------------------');
  
  if (logs.length > 0) {
    console.log(`✅ Success: ${logs.length} resonance pulses found in Railway cloud.`);
  } else {
    console.log('⚠️ No logs found yet. Waiting for heartbeat...');
  }
  
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
