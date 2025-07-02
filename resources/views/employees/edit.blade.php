@extends('layouts.app')

@section('title', 'Edit Employee')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Edit Employee</h1>
    <form action="{{ route('employees.update', $employee) }}" method="POST" class="space-y-4">
        @csrf
        @method('PUT')
        <div>
            <label class="block">Name</label>
            <input type="text" name="name" value="{{ $employee->name }}" class="border px-4 py-2 w-full" required>
        </div>
        <div>
            <label class="block">Email</label>
            <input type="email" name="email" value="{{ $employee->email }}" class="border px-4 py-2 w-full" required>
        </div>
        <div>
            <label class="block">Phone</label>
            <input type="text" name="phone" value="{{ $employee->phone }}" class="border px-4 py-2 w-full">
        </div>
        <div>
            <label class="block">Role</label>
            <input type="text" name="role" value="{{ $employee->role }}" class="border px-4 py-2 w-full">
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
    </form>
</div>
@endsection
