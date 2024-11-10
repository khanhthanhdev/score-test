import React from 'react';
import { Match } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface StatisticsProps {
  matches: Match[];
}

export const Statistics: React.FC<StatisticsProps> = ({ matches }) => {
  const calculateTeamStats = () => {
    const stats = new Map<number, { wins: number; matches: number; totalScore: number }>();

    matches.forEach((match) => {
      const processAlliance = (alliance: Match['redAlliance'], isWinner: boolean) => {
        alliance.teams.forEach((team) => {
          const current = stats.get(team.number) || { wins: 0, matches: 0, totalScore: 0 };
          stats.set(team.number, {
            wins: current.wins + (isWinner ? 1 : 0),
            matches: current.matches + 1,
            totalScore: current.totalScore + Object.values(alliance.scores).reduce((a, b) => a + b, 0),
          });
        });
      };

      const redScore = Object.values(match.redAlliance.scores).reduce((a, b) => a + b, 0);
      const blueScore = Object.values(match.blueAlliance.scores).reduce((a, b) => a + b, 0);

      processAlliance(match.redAlliance, redScore > blueScore);
      processAlliance(match.blueAlliance, blueScore > redScore);
    });

    return Array.from(stats.entries())
      .map(([number, data]) => ({
        teamNumber: number,
        winRate: (data.wins / data.matches) * 100,
        avgScore: data.totalScore / data.matches,
      }))
      .sort((a, b) => b.winRate - a.winRate);
  };

  const teamStats = calculateTeamStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Statistics</h2>
      <div className="w-full overflow-x-auto">
        <BarChart width={600} height={300} data={teamStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="teamNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="winRate" fill="#8884d8" name="Win Rate %" />
          <Bar dataKey="avgScore" fill="#82ca9d" name="Avg Score" />
        </BarChart>
      </div>
    </div>
  );
};