import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">HR Management System</h1>
                <p className="text-muted-foreground">Manage your workforce with ease.</p>
                <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded">Login</a>
            </div>
        </div>
    );
};

export default Welcome; 