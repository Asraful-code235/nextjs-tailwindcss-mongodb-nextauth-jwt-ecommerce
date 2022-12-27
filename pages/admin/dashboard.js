import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

function AdminDashboardScreen() {
  return (
    <Layout title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div className="bg-slate-200 max-h-fit p-5 rounded-lg">
          <ul>
            <li className="bg-slate-50 mb-4 p-5 rounded-lg font-semibold">
              <Link href="/admin/dashboard">
                <p className="font-bold">Dashboard</p>
              </Link>
            </li>
            <li className="bg-slate-50 mb-4 p-5 rounded-lg font-semibold">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Dashboard</h1>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-1">
              Welcome to the Dashboard
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
