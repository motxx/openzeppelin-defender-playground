import { AutotaskClient } from 'defender-autotask-client';
import dotenv from "dotenv";

dotenv.config();

async function uploadCode(autotaskId: string, apiKey: string, apiSecret: string) {
  const client = new AutotaskClient({ apiKey, apiSecret });
  await client.updateCodeFromFolder(autotaskId, './build/relay');
}

async function main() {
  const { TEAM_API_KEY: apiKey, TEAM_API_SECRET: apiSecret, AUTOTASK_ID: autotaskId } = process.env;
  if (!autotaskId) throw new Error(`Missing autotask id`);
  if (!apiKey || !apiSecret) throw new Error("Missing api keys");
  await uploadCode(autotaskId, apiKey, apiSecret);
  console.log(`Code updated`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}