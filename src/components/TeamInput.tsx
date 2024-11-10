import React from 'react';

interface TeamInputProps {
  teamNumber: number;
  onChange: (number: number) => void;
}

export const TeamInput: React.FC<TeamInputProps> = ({ teamNumber, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">Team #</label>
      <input
        type="number"
        value={teamNumber || ''}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
        min="0"
        max="9999"
      />
    </div>
  );
};