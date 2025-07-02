import React, { useEffect, useState } from 'react';
import Layout from './Layout';

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

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl mb-4">Employees</h1>
                <a href="/employees/create" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Add Employee</a>
                {loading ? (
                    <div>Loading...</div>
                ) : (
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
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td className="border px-4 py-2">{emp.employee_number}</td>
                                    <td className="border px-4 py-2">{emp.name}</td>
                                    <td className="border px-4 py-2">{emp.email}</td>
                                    <td className="border px-4 py-2">{emp.phone}</td>
                                    <td className="border px-4 py-2">{emp.role}</td>
                                    <td className="border px-4 py-2">
                                        <a href={`/employees/edit/${emp.id}`} className="text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
};

export default EmployeesIndex;
