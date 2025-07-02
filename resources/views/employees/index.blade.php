@extends('layouts.app')

@section('title', 'Employees')

@section('content')
<div class="p-6">
    <h1 class="text-2xl mb-4">Employees</h1>
    <a href="{{ route('employees.create') }}" class="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Add Employee</a>
    <table class="min-w-full bg-white border">
        <thead>
            <tr>
                <th class="px-4 py-2">Number</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Phone</th>
                <th class="px-4 py-2">Role</th>
                <th class="px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
        @foreach($employees as $employee)
            <tr class="border-t">
                <td class="px-4 py-2">{{ $employee->employee_number }}</td>
                <td class="px-4 py-2">{{ $employee->name }}</td>
                <td class="px-4 py-2">{{ $employee->email }}</td>
                <td class="px-4 py-2">{{ $employee->phone }}</td>
                <td class="px-4 py-2">{{ $employee->role }}</td>
                <td class="px-4 py-2 space-x-2">
                    <a href="{{ route('employees.edit', $employee) }}" class="text-blue-600">Edit</a>
                    <form action="{{ route('employees.destroy', $employee) }}" method="POST" class="inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600" onclick="return confirm('Delete this employee?')">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection
