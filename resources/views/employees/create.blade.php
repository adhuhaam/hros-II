@extends('layouts.app')

@section('title', 'Add Employee')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Add Employee</h1>
    <form action="{{ route('employees.store') }}" method="POST" class="space-y-4">
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
            <label class="block">Role</label>
            <input type="text" name="role" class="border px-4 py-2 w-full" value="employee">
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </form>
</div>
@endsection
