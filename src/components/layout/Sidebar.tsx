import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  TableCellsIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: HomeIcon },
  { name: 'Teams', path: '/admin/teams', icon: UserGroupIcon },
  { name: 'Matches', path: '/admin/matches', icon: TableCellsIcon },
  { name: 'Results', path: '/admin/results', icon: ChartBarIcon },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold">Tournament Manager</h1>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm ${
              location.pathname === item.path
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};