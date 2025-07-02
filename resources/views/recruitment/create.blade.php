@extends('layouts.app')

@section('title', 'Add Candidate')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Add Candidate</h1>
    <form action="{{ route('recruitment.store') }}" method="POST" class="space-y-4">
        @csrf
        <div>
            <label class="block">Name</label>
            <input type="text" name="name" class="border px-4 py-2 w-full" required>
        </div>
        <div>
            <label class="block">Email</label>
            <input type="email" name="email" class="border px-4 py-2 w-full" required>
        </div>
        <div>
            <label class="block">Phone</label>
            <input type="text" name="phone" class="border px-4 py-2 w-full">
        </div>
        <div>
            <label class="block">Status</label>
            <input type="text" name="status" class="border px-4 py-2 w-full" value="new">
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </form>
</div>
@endsection
