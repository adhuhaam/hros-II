@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        @foreach($modules as $module)
            <a href="{{ route($module['route']) }}" class="p-4 bg-white border rounded shadow text-center">
                {{ $module['title'] }}
            </a>
        @endforeach
    </div>
</div>
@endsection
