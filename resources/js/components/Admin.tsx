import React from 'react';
import Layout from './Layout';

const Admin: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Admin Area</h1>
                    <p>Only users with the <strong>admin</strong> role can see this page.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Admin; 