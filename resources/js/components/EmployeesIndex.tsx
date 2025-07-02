import React, { useEffect, useState } from 'react';

interface Employee {
    id: number;
    employee_number: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

const EmployeesIndex: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/employees')
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Employees</h1>
            <a href="/employees/create" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Add Employee</a>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Number</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr className="border-t" key={employee.id}>
                            <td className="px-4 py-2">{employee.employee_number}</td>
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.email}</td>
                            <td className="px-4 py-2">{employee.phone}</td>
                            <td className="px-4 py-2">{employee.role}</td>
                            <td className="px-4 py-2 space-x-2">
                                <a href={`/employees/edit/${employee.id}`} className="text-blue-600">Edit</a>
                                {/* Delete action can be implemented with a button and API call */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesIndex;
