export interface TournamentTeam {
  id: string;
  name: string;
  number: number;
  totalPoints: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
}

export interface TournamentMatch {
  id: string;
  matchNumber: number;
  timestamp: string;
  status: 'pending' | 'in_progress' | 'completed';
  redAlliance: {
    teams: string[];  // Team IDs
    score: number;
  };
  blueAlliance: {
    teams: string[];  // Team IDs
    score: number;
  };
  winner?: 'red' | 'blue' | 'tie';
  round: 'qualification' | 'elimination';
}

export interface Tournament {
  id: string;
  name: string;
  status: 'setup' | 'qualification' | 'elimination' | 'completed';
  teams: TournamentTeam[];
  currentMatch?: string;  // Current match ID
}