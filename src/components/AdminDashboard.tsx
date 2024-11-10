import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TournamentTeam } from '../types/tournament';
import { addMinutes, format, parse } from 'date-fns';

const SAMPLE_TEAMS: TournamentTeam[] = [
  { id: '1', name: 'Robotic Rangers', number: 1001, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '2', name: 'Tech Tigers', number: 1002, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '3', name: 'Binary Bulldogs', number: 1003, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '4', name: 'Cyber Cougars', number: 1004, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '5', name: 'Digital Dragons', number: 1005, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '6', name: 'Mecha Mustangs', number: 1006, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '7', name: 'Circuit Sharks', number: 1007, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '8', name: 'Quantum Queens', number: 1008, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '9', name: 'Byte Bears', number: 1009, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '10', name: 'Logic Lions', number: 1010, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '11', name: 'Data Dolphins', number: 1011, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '12', name: 'Algorithm Eagles', number: 1012, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '13', name: 'Neural Knights', number: 1013, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '14', name: 'Pixel Panthers', number: 1014, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '15', name: 'Vector Vipers', number: 1015, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
  { id: '16', name: 'System Spartans', number: 1016, totalPoints: 0, matchesPlayed: 0, wins: 0, losses: 0 },
];

export const AdminDashboard: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const [teams, setTeams] = useState<TournamentTeam[]>(SAMPLE_TEAMS);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleCreateTournament = async () => {
    if (!startDate || !startTime) {
      alert('Please select start date and time');
      return;
    }

    setLoading(true);
    try {
      const tournamentStartTime = parse(
        `${startDate} ${startTime}`,
        'yyyy-MM-dd HH:mm',
        new Date()
      );

      const tournamentRef = await addDoc(collection(db, 'tournaments'), {
        name: 'Robotics Tournament 2024',
        status: 'setup',
        teams: teams,
        startTime: tournamentStartTime.toISOString(),
        createdAt: new Date().toISOString(),
        createdBy: currentUser?.uid,
      });
      
      // Create initial qualification matches
      const matches = generateQualificationMatches(teams, tournamentStartTime);
      for (const match of matches) {
        await addDoc(collection(db, 'tournaments', tournamentRef.id, 'matches'), match);
      }
      
      alert('Tournament created successfully!');
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament');
    } finally {
      setLoading(false);
    }
  };

  const generateQualificationMatches = (teams: TournamentTeam[], startTime: Date) => {
    const matches = [];
    const teamIds = teams.map(team => team.id);
    let currentMatchTime = startTime;
    
    // Generate random matches ensuring each team plays equal number of times
    for (let i = 0; i < 8; i++) {  // 8 rounds of matches
      const shuffledTeams = [...teamIds].sort(() => Math.random() - 0.5);
      
      for (let j = 0; j < teamIds.length; j += 6) {  // 6 teams per match (3 per alliance)
        const matchTeams = shuffledTeams.slice(j, j + 6);
        if (matchTeams.length === 6) {
          matches.push({
            matchNumber: matches.length + 1,
            scheduledTime: currentMatchTime.toISOString(),
            status: 'pending',
            redAlliance: {
              teams: matchTeams.slice(0, 3),
              score: 0,
            },
            blueAlliance: {
              teams: matchTeams.slice(3, 6),
              score: 0,
            },
            round: 'qualification',
          });
          // Add 15 minutes for the next match
          currentMatchTime = addMinutes(currentMatchTime, 15);
        }
      }
    }
    
    return matches;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tournament Admin Dashboard</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Tournament Setup</h2>
          
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Registered Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.id} className="p-4 border rounded">
                <div className="font-medium">{team.name}</div>
                <div className="text-sm text-gray-600">Team #{team.number}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCreateTournament}
              disabled={loading || !startDate || !startTime}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Creating Tournament...' : 'Create Tournament'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};