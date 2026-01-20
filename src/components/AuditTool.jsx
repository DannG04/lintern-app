import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import AuditResults from './AuditResults';
import AuditMetrics from './AuditMetrics';
import { runCodeAudit } from '../utils/auditRules';

const AuditTool = () => {
  const [codeToAudit, setCodeToAudit] = useState('// Pega tu código aquí\nvar x = 10;\nfunction test(){\n  if(x == 10){\n    alert("Error");\n  }\n}');
  const [auditResults, setAuditResults] = useState([]);

  const handleRunAudit = () => {
    const results = runCodeAudit(codeToAudit);
    setAuditResults(results);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Linter Básico de Auditoría</h2>
        <p className="text-slate-500 mt-1">Analiza tu código JavaScript en busca de problemas de calidad y seguridad</p>
      </div>
      
      {auditResults.length > 0 && <AuditMetrics results={auditResults} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeEditor 
          code={codeToAudit} 
          setCode={setCodeToAudit} 
          onAudit={handleRunAudit} 
        />
        <AuditResults results={auditResults} />
      </div>
    </div>
  );
};

export default AuditTool;
