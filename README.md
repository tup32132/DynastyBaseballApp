# ⚾ Dynasty Baseball App

A full-stack fantasy baseball platform for dynasty leagues, built to be modern, mobile-friendly, and actually enjoyable to use.

This app supports:
- Web & Mobile (Android/iOS) via **React Native + Expo**
- **Discord integration** for login and league chat
- Dynasty-friendly features like minor league rosters, custom drafts, and long-term league management
- Live scoring and push notifications to outperform Fantrax

---

## 📱 Tech Stack

| Area        | Tech                                |
|-------------|-------------------------------------|
| Frontend    | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| Styling     | [TailwindCSS](https://tailwindcss.com/) via [NativeWind](https://www.nativewind.dev/) |
| Backend     | [Supabase](https://supabase.com/) (Postgres + Auth + Realtime) |
| Discord     | Discord OAuth2, Slash Commands, Bot API |
| Deployment  | Vercel (web), Expo EAS (mobile)     |

## Core Tables
| Table       | Fields |
|-------------|------------------------------------------------------------------------------------------|
| Users       | id, discord_id, username, email                                                          |
| Leagues     | id, name, commissioner_id, discord_channel_id                                            |
| Teams       | id, user_id, league_id, name, logo_url, is_commissioner                                  |
| Players     | id, mlb_id, name, position, mlb_team                                                     | 
| Rosters     | id, team_id, player_id, slot                                                             | 
| Drafts      | id, league_id, round, pick_number, team_id, player_id, created_at                        |
---

## 🗂 Project Structure
```text
dynasty-baseball-app/
│
├── apps/
│ ├── mobile/ # Expo mobile app (React Native)
│ └── web/ # (Optional) separate frontend if needed
│
├── backend/ # Server logic (Supabase scripts, API)
├── infra/discord-bot/ # Discord bot + slash commands
└── README.md
```

## 🧑‍💻 Local Setup

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/DynastyBaseballApp.git
cd DynastyBaseballApp
```
### 2. Start the App
```bash
cd apps/mobile
npm install
npx expo start
```

## 🧪 Developer Tasks
First contributor tasks:

 Set up Discord login screen

 Create home screen layout (league cards)

 Design and implement Team page UI

 Hook up navigation (React Navigation)

 Style with Tailwind (via NativeWind)

Check out /apps/mobile/README.md for module-specific instructions and wireframes (coming soon).

## 📅 Project Timeline
We’re aiming to launch for the 2026 baseball season:

🔧 June–July: Scaffolding, UI setup, Discord login

⚾ Aug–Sept: Leagues, Teams, Player DB

🧠 Oct–Nov: Draft system, trades, Discord sync

📲 Dec–Jan: Live scoring, push notifs, polish

🚀 February 2026: Launch to real leagues!

## 🤝 Contributors
Poopsock – Project lead, backend/devops/full-stack

Clovena – Frontend/UI dev


