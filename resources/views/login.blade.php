@extends('layouts.app')

@section('title', 'Login')

@section('content')
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted/60 to-accent/30 animate-fade-in-up py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 glass border-gradient rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        <div class="flex flex-col items-center space-y-3 mb-2">
            <h2 class="text-center text-3xl font-extrabold gradient-text-primary tracking-tight drop-shadow-lg">Sign in to your account</h2>
        </div>
        <form class="mt-8 space-y-6" method="POST" action="{{ route('login.submit') }}">
            @csrf
            <input type="hidden" name="remember" value="true">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
                    <input id="email" name="email" type="email" autocomplete="email" required value="{{ old('email') }}" class="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md" placeholder="Email address">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-xl border border-border bg-input-background/80 px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md" placeholder="Password">
                </div>
            </div>

            @error('email')
                <p class="text-destructive text-sm mt-2">{{ $message }}</p>
            @enderror

            <div class="flex items-center justify-between mt-4">
                <div class="flex items-center">
                    <input id="remember-me" name="remember" type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-border rounded transition-all duration-200">
                    <label for="remember-me" class="ml-2 block text-sm text-muted-foreground">Remember me</label>
                </div>

                <div class="text-sm">
                    <a href="#" class="font-medium text-primary hover:underline transition-colors">Forgot your password?</a>
                </div>
            </div>

            <div class="mt-6">
                <button type="submit" class="w-full px-4 py-3 rounded-xl btn-gradient text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 animate-fade-in-up">
                    Sign in
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
