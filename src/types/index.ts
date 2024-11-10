export interface Team {
  number: number;
  name: string;
}

export interface Alliance {
  teams: Team[];
  color: 'red' | 'blue';
  scores: Record<string, number>;
}

export interface Match {
  id: string;
  timestamp: string;
  redAlliance: Alliance;
  blueAlliance: Alliance;
  winner?: 'red' | 'blue' | 'tie';
}

export interface ScoringCriteria {
  id: string;
  name: string;
  baseValue: number;
  presetValues: number[];
}