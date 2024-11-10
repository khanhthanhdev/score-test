import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

interface ScoringPanelProps {
  scores: Record<string, number>;
  onScoreUpdate: (criteriaId: string, value: number) => void;
}

const SCORING_CRITERIA = [
  { id: 'autonomous', name: 'Autonomous', baseValue: 10 },
  { id: 'teleop', name: 'Teleop', baseValue: 5 },
  { id: 'endgame', name: 'Endgame', baseValue: 15 },
  { id: 'bonus', name: 'Bonus', baseValue: 20 },
];

export const ScoringPanel: React.FC<ScoringPanelProps> = ({ scores, onScoreUpdate }) => {
  const handleScoreChange = (criteriaId: string, delta: number) => {
    const currentScore = scores[criteriaId] || 0;
    onScoreUpdate(criteriaId, Math.max(0, currentScore + delta));
  };

  return (
    <div className="space-y-4">
      {SCORING_CRITERIA.map((criteria) => (
        <div key={criteria.id} className="flex items-center justify-between">
          <span className="font-medium">{criteria.name}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleScoreChange(criteria.id, -criteria.baseValue)}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="w-12 text-center">{scores[criteria.id] || 0}</span>
            <button
              onClick={() => handleScoreChange(criteria.id, criteria.baseValue)}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <div className="text-xl font-bold text-right">
        Total: {Object.values(scores).reduce((a, b) => a + b, 0)}
      </div>
    </div>
  );
};