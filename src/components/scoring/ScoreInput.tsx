import React, { useState } from 'react';
import { TournamentMatch } from '../../types/tournament';

interface ScoreInputProps {
  match: TournamentMatch;
  onScoreSubmit: (matchId: string, redScore: number, blueScore: number) => void;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({ match, onScoreSubmit }) => {
  const [redScore, setRedScore] = useState(match.redAlliance.score);
  const [blueScore, setBlueScore] = useState(match.blueAlliance.score);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScoreSubmit(match.id, redScore, blueScore);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-red-700">Red Alliance Score</label>
          <input
            type="number"
            min="0"
            value={redScore}
            onChange={(e) => setRedScore(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-700">Blue Alliance Score</label>
          <input
            type="number"
            min="0"
            value={blueScore}
            onChange={(e) => setBlueScore(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Update Scores
        </button>
      </div>
    </form>
  );
};