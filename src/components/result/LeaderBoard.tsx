import React from 'react';
import { TournamentTeam } from '../../types/tournament';

interface LeaderboardProps {
  teams: TournamentTeam[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => {
    // Sort by wins first
    if (b.wins !== a.wins) return b.wins - a.wins;
    // Then by total points
    return b.totalPoints - a.totalPoints;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              W/L
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTeams.map((team, index) => (
            <tr key={team.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{team.name}</div>
                <div className="text-sm text-gray-500">#{team.number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.wins}/{team.losses}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.totalPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};