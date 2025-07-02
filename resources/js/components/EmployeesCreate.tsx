import React, { useState } from 'react';
import Layout from './Layout';

const EmployeesCreate: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'employee',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to create employee');
            setSuccess('Employee created successfully!');
            setForm({ name: '', email: '', phone: '', role: 'employee' });
        } catch (err: any) {
            setError(err.message || 'Error creating employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-6 max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl shadow-md border">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} className="border px-4 py-2 w-full rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} className="border px-4 py-2 w-full rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1">Phone</label>
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} className="border px-4 py-2 w-full rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Role</label>
                        <input type="text" name="role" value={form.role} onChange={handleChange} className="border px-4 py-2 w-full rounded" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    {success && <div className="text-green-600 mt-2">{success}</div>}
                    {error && <div className="text-red-600 mt-2">{error}</div>}
                </form>
            </div>
        </Layout>
    );
};

export default EmployeesCreate;
