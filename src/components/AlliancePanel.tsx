import React from 'react';
import { Alliance } from '../types';
import { TeamInput } from './TeamInput';
import { ScoringPanel } from './ScoringPanel';

interface AlliancePanelProps {
  alliance: Alliance;
  onUpdateAlliance: (alliance: Alliance) => void;
}

export const AlliancePanel: React.FC<AlliancePanelProps> = ({ alliance, onUpdateAlliance }) => {
  const handleTeamUpdate = (index: number, teamNumber: number) => {
    const newTeams = [...alliance.teams];
    newTeams[index] = { ...newTeams[index], number: teamNumber };
    onUpdateAlliance({ ...alliance, teams: newTeams });
  };

  const handleScoreUpdate = (criteriaId: string, value: number) => {
    onUpdateAlliance({
      ...alliance,
      scores: { ...alliance.scores, [criteriaId]: value },
    });
  };

  return (
    <div className={`p-4 rounded-lg ${alliance.color === 'red' ? 'bg-red-100' : 'bg-blue-100'}`}>
      <h2 className="text-xl font-bold mb-4">
        {alliance.color === 'red' ? 'Red' : 'Blue'} Alliance
      </h2>
      <div className="space-y-4">
        {alliance.teams.map((team, index) => (
          <TeamInput
            key={index}
            teamNumber={team.number}
            onChange={(number) => handleTeamUpdate(index, number)}
          />
        ))}
        <ScoringPanel
          scores={alliance.scores}
          onScoreUpdate={handleScoreUpdate}
        />
      </div>
    </div>
  );
};