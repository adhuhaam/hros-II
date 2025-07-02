import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted/60 to-accent/30 animate-fade-in-up py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass border-gradient rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                <div className="flex flex-col items-center space-y-3 mb-2">
                    <h2 className="text-center text-3xl font-extrabold gradient-text-primary tracking-tight drop-shadow-lg">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md" placeholder="Password" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-border rounded transition-all duration-200" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:underline transition-colors">Forgot your password?</a>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-3 rounded-xl btn-gradient text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 animate-fade-in-up">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 