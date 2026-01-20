import React from 'react';
import { Search } from 'lucide-react';

const CodeEditor = ({ code, setCode, onAudit }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-slate-700">Código a analizar (JS/HTML)</label>
        <span className="text-xs text-slate-400">
          {code.split('\n').length} líneas • {code.length} caracteres
        </span>
      </div>
      <textarea 
        className="w-full h-80 p-4 font-mono text-sm bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button 
        onClick={onAudit}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
      >
        <Search size={20} /> Ejecutar Auditoría
      </button>
    </div>
  );
};

export default CodeEditor;
