<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(): View
    {
        $employees = Employee::all();

        return view('employees.index', compact('employees'));
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): View
    {
        return view('employees.create');
    }

    /**
     * Store a newly created employee in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string',
            'role' => 'required|string',
        ]);

        // Generate unique employee number
        $data['employee_number'] = 'EMP-' . str_pad((string) (Employee::max('id') + 1), 5, '0', STR_PAD_LEFT);

        Employee::create($data);

        return redirect()->route('employees.index');
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): View
    {
        return view('employees.edit', compact('employee'));
    }

    /**
     * Update the specified employee in storage.
     */
    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'phone' => 'nullable|string',
            'role' => 'required|string',
        ]);

        $employee->update($data);

        return redirect()->route('employees.index');
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->delete();

        return redirect()->route('employees.index');
    }
}
