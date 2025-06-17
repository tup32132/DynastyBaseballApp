import { supabase } from './supabaseClient';

/**
 * Seeds the players table with MLB players from the unofficial MLB stats API
 *
 * @returns {Promise<void>}
 */

async function seedPlayers() {
  console.log("Seeding players...");
  const { data, error } = await supabase
    .from('players')
    .insert([
      {
        mlb_id: 680757,
        name: 'Steven Kwan',
        team: 'CLE',
        position: 'LF',
        birthdate: '1997-09-05',
        bats: 'L',
        throws: 'L',
        debut: '2022-04-07',
        league: 'MLB',
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting player:', error);
  } else {
    console.log('Inserted player:', data);
  }
}

seedPlayers();
