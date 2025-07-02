@extends('layouts.app')

@section('title', 'Recruitment')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Recruitment</h1>
    <a href="{{ route('recruitment.create') }}" class="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Add Candidate</a>
    <table class="min-w-full bg-white border">
        <thead>
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Phone</th>
                <th class="px-4 py-2">Status</th>
                <th class="px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
        @foreach($candidates as $candidate)
            <tr class="border-t">
                <td class="px-4 py-2">{{ $candidate->name }}</td>
                <td class="px-4 py-2">{{ $candidate->email }}</td>
                <td class="px-4 py-2">{{ $candidate->phone }}</td>
                <td class="px-4 py-2">{{ $candidate->status }}</td>
                <td class="px-4 py-2">
                    <form action="{{ route('recruitment.destroy', $candidate) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600" onclick="return confirm('Delete this candidate?')">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection
