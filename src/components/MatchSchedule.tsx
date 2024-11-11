import React from 'react';
import { TournamentMatch, TournamentTeam } from '../types/tournament';
import { format } from 'date-fns';

interface MatchScheduleProps {
  matches: TournamentMatch[];
  teams: TournamentTeam[];
}

export const MatchSchedule: React.FC<MatchScheduleProps> = ({ matches, teams }) => {
  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? `${team.number} - ${team.name}` : 'Unknown Team';
  };

  const getMatchStatus = (status: TournamentMatch['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Match Schedule</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className={`p-4 rounded-lg shadow-md ${getMatchStatus(match.status)}`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">
                Match #{match.matchNumber} - {format(new Date(match.timestamp), 'PPp')}
              </span>
              <span className="px-2 py-1 rounded text-sm capitalize">
                {match.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Red Alliance */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-red-700 font-semibold mb-2">Red Alliance</h3>
                <ul className="space-y-1">
                  {match.redAlliance.teams.map((teamId) => (
                    <li key={teamId} className="text-red-900">
                      {getTeamName(teamId)}
                    </li>
                  ))}
                </ul>
                {match.status === 'completed' && (
                  <div className="mt-2 text-lg font-bold text-red-700">
                    Score: {match.redAlliance.score}
                  </div>
                )}
              </div>

              {/* Blue Alliance */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-700 font-semibold mb-2">Blue Alliance</h3>
                <ul className="space-y-1">
                  {match.blueAlliance.teams.map((teamId) => (
                    <li key={teamId} className="text-blue-900">
                      {getTeamName(teamId)}
                    </li>
                  ))}
                </ul>
                {match.status === 'completed' && (
                  <div className="mt-2 text-lg font-bold text-blue-700">
                    Score: {match.blueAlliance.score}
                  </div>
                )}
              </div>
            </div>

            {match.winner && match.status === 'completed' && (
              <div className="mt-4 text-center font-bold">
                Winner: {match.winner === 'red' ? 'Red Alliance' : 'Blue Alliance'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};