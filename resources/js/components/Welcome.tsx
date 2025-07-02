import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted/60 to-accent/30 animate-fade-in-up py-12 px-4">
            <div className="text-center space-y-8 bg-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-10 animate-fade-in-up">
                <h1 className="text-4xl font-extrabold gradient-text-primary tracking-tight drop-shadow-lg animate-fade-in-down">HR Management System</h1>
                <p className="text-lg text-muted-foreground animate-fade-in-up">Manage your workforce with ease.</p>
                <a href="/login" className="inline-block px-8 py-3 btn-gradient text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-all duration-200 animate-fade-in-up">Login</a>
            </div>
        </div>
    );
};

export default Welcome; 