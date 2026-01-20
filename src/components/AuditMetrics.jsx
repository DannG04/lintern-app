import React from 'react';

const AuditMetrics = ({ results }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
        <p className="text-xs opacity-80 font-medium">Total Hallazgos</p>
        <p className="text-3xl font-bold">{results.length}</p>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl text-white shadow-lg">
        <p className="text-xs opacity-80 font-medium">Críticos</p>
        <p className="text-3xl font-bold">{results.filter(r => r.severity === 'Crítica').length}</p>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white shadow-lg">
        <p className="text-xs opacity-80 font-medium">Altos</p>
        <p className="text-3xl font-bold">{results.filter(r => r.severity === 'Alta').length}</p>
      </div>
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white shadow-lg">
        <p className="text-xs opacity-80 font-medium">Medios</p>
        <p className="text-3xl font-bold">{results.filter(r => r.severity === 'Media').length}</p>
      </div>
      <div className="bg-gradient-to-br from-slate-500 to-slate-600 p-4 rounded-xl text-white shadow-lg">
        <p className="text-xs opacity-80 font-medium">Bajos</p>
        <p className="text-3xl font-bold">{results.filter(r => r.severity === 'Baja').length}</p>
      </div>
    </div>
  );
};

export default AuditMetrics;
