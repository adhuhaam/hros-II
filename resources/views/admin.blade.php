@extends('layouts.app')

@section('title', 'Admin')

@section('content')
<div class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold">Admin Area</h1>
        <p>Only users with the <strong>admin</strong> role can see this page.</p>
    </div>
</div>
@endsection
