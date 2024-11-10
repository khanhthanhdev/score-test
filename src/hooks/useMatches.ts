import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Match } from '../types';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'matches'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const matchesData: Match[] = [];
      querySnapshot.forEach((doc) => {
        matchesData.push({ id: doc.id, ...doc.data() } as Match);
      });
      setMatches(matchesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addMatch = async (match: Omit<Match, 'id'>) => {
    try {
      await addDoc(collection(db, 'matches'), match);
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const updateMatch = async (matchId: string, match: Partial<Match>) => {
    try {
      const matchRef = doc(db, 'matches', matchId);
      await updateDoc(matchRef, match);
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  const deleteMatch = async (matchId: string) => {
    try {
      await deleteDoc(doc(db, 'matches', matchId));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  return {
    matches,
    loading,
    addMatch,
    updateMatch,
    deleteMatch,
  };
}