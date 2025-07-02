@extends('layouts.app')

@section('title', 'Login')

@section('content')
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/80 animate-fade-in-up py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-8 animate-fade-in-up">
        <div class="flex flex-col items-center space-y-2">
            <svg class="mx-auto h-12 w-auto text-primary animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z" clip-rule="evenodd" />
            </svg>
            <h2 class="text-center text-3xl font-bold gradient-text-primary tracking-tight">Sign in to your account</h2>
        </div>
        <form class="mt-8 space-y-6" method="POST" action="{{ route('login.submit') }}">
            @csrf
            <input type="hidden" name="remember" value="true">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
                    <input id="email" name="email" type="email" autocomplete="email" required value="{{ old('email') }}" class="block w-full rounded-xl border border-border bg-input-background px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 shadow-sm" placeholder="Email address">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-xl border border-border bg-input-background px-4 py-3 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 shadow-sm" placeholder="Password">
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
                <button type="submit" class="w-full px-4 py-3 rounded-xl btn-gradient text-white font-semibold shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 animate-fade-in-up">
                    Sign in
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
