import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // Simulate login (replace with real API call)
        setTimeout(() => {
            setLoading(false);
            if (email === 'admin@example.com' && password === 'password') {
                window.location.href = '/dashboard';
            } else {
                setError('Invalid credentials');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted/60 to-accent/30 py-12 px-4">
            <div className="w-full max-w-md bg-white dark:bg-muted rounded-2xl shadow-2xl border border-border p-8 flex flex-col items-center animate-fade-in-up">
                <h2 className="text-3xl font-extrabold gradient-text-primary tracking-tight drop-shadow-lg mb-6 text-center">Sign in to your account</h2>
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold shadow-md hover:scale-105 hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; 