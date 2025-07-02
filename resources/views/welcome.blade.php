@extends('layouts.app')

@section('title', 'Welcome')

@section('content')
<div class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
        <h1 class="text-4xl font-bold">HR Management System</h1>
        <p class="text-muted-foreground">Manage your workforce with ease.</p>
        <a href="{{ route('login') }}" class="px-6 py-3 bg-blue-600 text-white rounded">Login</a>
    </div>
</div>
@endsection
