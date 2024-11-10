import React from 'react';
import { Match } from '../types';
import { format } from 'date-fns';

interface MatchHistoryProps {
  matches: Match[];
  onEditMatch: (match: Match) => void;
  onDeleteMatch: (matchId: string) => void;
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({
  matches,
  onEditMatch,
  onDeleteMatch,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Match History</h2>
      <div className="space-y-2">
        {matches.map((match) => (
          <div
            key={match.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium">
                Match {match.id} - {format(new Date(match.timestamp), 'PPp')}
              </div>
              <div className="text-sm text-gray-600">
                Red Alliance: {match.redAlliance.teams.map((t) => t.number).join(', ')}
                <br />
                Blue Alliance: {match.blueAlliance.teams.map((t) => t.number).join(', ')}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditMatch(match)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteMatch(match.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};