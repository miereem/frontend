import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <Users className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">HumanBeings</span>
                        </Link>

                        <div className="flex space-x-4">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isActive('/')
                                        ? 'text-blue-700 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Human Beings
                            </Link>

                            <Link
                                to="/operations"
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isActive('/operations')
                                        ? 'text-blue-700 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Special Operations
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};