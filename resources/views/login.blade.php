@extends('layouts.app')

@section('title', 'Login')

@section('content')
<div class="min-h-screen flex items-center justify-center">
    <form method="POST" action="{{ route('login.submit') }}" class="bg-card p-6 rounded-xl w-full max-w-md space-y-4">
        @csrf
        <h1 class="text-xl font-semibold text-center">Sign In</h1>
        <div>
            <label for="email" class="block text-sm mb-1">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus class="w-full border border-border rounded px-3 py-2" />
        </div>
        <div>
            <label for="password" class="block text-sm mb-1">Password</label>
            <input id="password" type="password" name="password" required class="w-full border border-border rounded px-3 py-2" />
        </div>
        @error('email')
            <p class="text-red-500 text-sm">{{ $message }}</p>
        @enderror
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
</div>
@endsection
