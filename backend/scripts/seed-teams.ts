import fetch from 'node-fetch';
import { supabase } from './supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

type TeamResponse = {
  teams: {
    id: number;
    name: string;
    locationName: string;
    abbreviation: string;
    sport: {
      id: number;
    };
  }[];
};

const sportIdToLevel: { [key: number]: string } = {
  1: 'MLB',
  11: 'AAA',
  12: 'AA',
  13: 'A+',
  14: 'A',
  16: 'Rookie Advanced',
  17: 'Rookie'
};

async function seedTeams() {
  console.log('Fetching teams from MLB API...');

  const url =
    'https://statsapi.mlb.com/api/v1/teams?sportId=1';

  const res = await fetch(url);
  const json = (await res.json()) as TeamResponse;

  const teams = json.teams
    .filter((t) => sportIdToLevel[t.sport.id]) // Filter only known levels
    .map((t) => ({
      mlb_team_id: t.id,
      name: t.name,
      location: t.locationName,
      abbreviation: t.abbreviation,
      level: sportIdToLevel[t.sport.id] as string,
    }));

  const { data, error } = await supabase.from('teams').upsert(teams, {onConflict: 'mlb_team_id'}) as PostgrestResponse<{
  mlb_team_id: number;
  name: string;
  location: string;
  abbreviation: string;
  level: string;
}[]>;

  if (error) {
    console.error('Error inserting teams:', error);
  } else {
    console.log(`Inserted ${data?.length ?? teams.length} teams.`);
  }
}

seedTeams();
