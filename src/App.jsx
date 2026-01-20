import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Tutorial from './components/Tutorial';
import AuditTool from './components/AuditTool';
import Dashboard from './components/Dashboard';

const App = () => {
  const [activeTab, setActiveTab] = useState('tutorial');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="md:ml-64 p-4 md:p-10">
        {activeTab === 'tutorial' && <Tutorial />}
        {activeTab === 'auditoria' && <AuditTool />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>

      <footer className="md:ml-64 p-6 text-center text-slate-400 text-sm">
        Unidad 5: Mantenimiento - Ingeniería de Sistemas &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
