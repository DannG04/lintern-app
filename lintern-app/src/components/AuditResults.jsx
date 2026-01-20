import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AuditResults = ({ results }) => {
  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'Crítica': return 'bg-red-50 border-red-500 text-red-900';
      case 'Alta': return 'bg-orange-50 border-orange-500 text-orange-900';
      case 'Media': return 'bg-amber-50 border-amber-400 text-amber-900';
      default: return 'bg-slate-50 border-slate-300 text-slate-700';
    }
  };
  
  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Crítica': return 'bg-red-600 text-white';
      case 'Alta': return 'bg-orange-600 text-white';
      case 'Media': return 'bg-amber-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold">Hallazgos de Seguridad/Calidad</h3>
        <div className="flex gap-2 items-center">
          {results.filter(r => r.severity === 'Crítica').length > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
              {results.filter(r => r.severity === 'Crítica').length} Críticos
            </span>
          )}
          {results.filter(r => r.severity === 'Alta').length > 0 && (
            <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-bold">
              {results.filter(r => r.severity === 'Alta').length} Altos
            </span>
          )}
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{results.length}</span>
        </div>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto max-h-[400px]">
        {results.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <CheckCircle2 className="mx-auto mb-2 opacity-20" size={48} />
            <p>No se encontraron problemas evidentes.</p>
          </div>
        ) : (
          results.map((res, i) => (
            <div key={i} className={`p-4 rounded-lg border-l-4 ${getSeverityStyle(res.severity)}`}>
              <div className="flex justify-between mb-2">
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-bold uppercase text-slate-400">Línea {res.line}</span>
                  {res.category && (
                    <span className="text-xs px-2 py-0.5 bg-white rounded-full border border-slate-200">
                      {res.category}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${getSeverityBadge(res.severity)}`}>
                  {res.severity}
                </span>
              </div>
              <p className="text-sm">{res.msg}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditResults;
