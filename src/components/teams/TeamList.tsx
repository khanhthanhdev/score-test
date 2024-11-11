import React from 'react';
import { TournamentTeam } from '../../types/tournament';

interface TeamListProps {
  teams: TournamentTeam[];
}

export const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <div key={team.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{team.name}</h3>
              <p className="text-gray-600">Team #{team.number}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                Matches: <span className="font-medium">{team.matchesPlayed}</span>
              </p>
              <p className="text-sm">
                W/L: <span className="font-medium">{team.wins}/{team.losses}</span>
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-600">
              Total Points: <span className="font-medium">{team.totalPoints}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};