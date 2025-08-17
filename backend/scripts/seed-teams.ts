// backend/scripts/seed-teams.ts
import dotenv from "dotenv";
import * as path from "path";

// Load .env from project root regardless of CJS/ESM
dotenv.config({ path: path.join(process.cwd(), ".env") });

import { createClient } from "@supabase/supabase-js";

// Sanity checks
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing envs. Where I'm looking for .env:", path.join(process.cwd(), ".env"));
  console.error("SUPABASE_URL present?", !!process.env.SUPABASE_URL);
  console.error("SERVICE_ROLE_KEY present?", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---- Config ----
const SPORT_IDS = [1, 11, 12, 13, 14, 16]; // MLB, AAA, AA, A+, A, R

type StatsApiTeam = {
  id: number;
  name: string;
  abbreviation?: string;
  league?: { name?: string } | null;
  division?: { name?: string } | null;
};

function levelFromSportId(id: number): "MLB" | "AAA" | "AA" | "A+" | "A" | "R" | null {
  switch (id) {
    case 1: return "MLB";
    case 11: return "AAA";
    case 12: return "AA";
    case 13: return "A+";
    case 14: return "A";
    case 16: return "R";
    default: return null;
  }
}

async function fetchTeams(sportId: number): Promise<StatsApiTeam[]> {
  const url = `https://statsapi.mlb.com/api/v1/teams?sportId=${sportId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const json: any = await res.json();
  return (json.teams ?? []) as StatsApiTeam[];
}

async function upsertTeams(sportId: number, teams: StatsApiTeam[]) {
  if (!teams.length) return;
  const level = levelFromSportId(sportId);
  const rows = teams.map((t) => ({
    mlb_team_id: t.id,                 // <-- satisfies NOT NULL constraint
    statsapi_team_id: t.id,
    name: t.name,
    abbreviation: t.abbreviation ?? null,
    league: t.league?.name ?? null,
    division: t.division?.name ?? null,
    level,
}));


  const { error } = await supabase.from("mlb_teams").upsert(rows, { onConflict: "mlb_team_id" });
  if (error) throw error;
}

(async () => {
  for (const sportId of SPORT_IDS) {
    console.log(`Fetching sportId=${sportId}...`);
    const teams = await fetchTeams(sportId);
    console.log(`  -> ${teams.length} teams`);
    await upsertTeams(sportId, teams);
    console.log(`Upserted sportId=${sportId}`);
  }
  console.log("Done ✅");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
