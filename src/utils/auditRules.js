export const runCodeAudit = (codeToAudit) => {
  const findings = [];
  const lines = codeToAudit.split('\n');
  const code = codeToAudit;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Regla 1: Uso de 'var' (Obsolescencia)
    if (/\bvar\s+/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de "var" detectado. Se recomienda usar "let" o "const" para evitar problemas de scope.',
        severity: 'Baja',
        category: 'Obsolescencia'
      });
    }
    
    // Regla 2: Uso de alert (Mala práctica en producción)
    if (/alert\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de "alert()" detectado. Bloquea el hilo principal; usa modales personalizados.',
        severity: 'Media',
        category: 'Buenas Prácticas'
      });
    }
    
    // Regla 3: Uso de console.log (Debe removerse en producción)
    if (/console\.(log|debug|info|warn)\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'console.log() detectado. Remueve los logs antes de producción o usa un sistema de logging.',
        severity: 'Baja',
        category: 'Producción'
      });
    }
    
    // Regla 4: Comparación débil
    if (/[^=!]={2}[^=]/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comparación débil (==). Usa comparación estricta (===) para evitar coerción de tipos.',
        severity: 'Media',
        category: 'Calidad'
      });
    }
    
    // Regla 5: Comparación débil de desigualdad
    if (/[^!]=!={1}[^=]/.test(line) && !line.includes('!==')) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comparación débil (!=). Usa comparación estricta (!==) para evitar coerción de tipos.',
        severity: 'Media',
        category: 'Calidad'
      });
    }
    
    // Regla 6: Funciones vacías
    if (/function\s+\w*\s*\([^)]*\)\s*\{\s*\}/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Función vacía detectada. Elimina código muerto para mejorar la mantenibilidad.',
        severity: 'Baja',
        category: 'Código Muerto'
      });
    }
    
    // Regla 7: Uso de eval (Riesgo de seguridad)
    if (/\beval\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de eval() detectado. Es una vulnerabilidad de seguridad crítica (XSS). Evita su uso.',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 8: Uso de innerHTML (Riesgo XSS)
    if (/\.innerHTML\s*=/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de innerHTML detectado. Puede causar vulnerabilidad XSS. Usa textContent o sanitiza el contenido.',
        severity: 'Alta',
        category: 'Seguridad'
      });
    }
    
    // Regla 9: Contraseñas o tokens hardcodeados
    if (/(password|token|apikey|secret|api_key)\s*[=:]\s*['"][^'"]+['"]/i.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Posible credencial hardcodeada detectada. Usa variables de entorno para datos sensibles.',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 10: document.write (Obsoleto y peligroso)
    if (/document\.write\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'document.write() es obsoleto y bloquea el renderizado. Usa métodos modernos del DOM.',
        severity: 'Media',
        category: 'Obsolescencia'
      });
    }
    
    // Regla 11: try sin catch
    if (trimmedLine.startsWith('try') && trimmedLine.includes('{')) {
      const nextLines = lines.slice(index, Math.min(index + 10, lines.length)).join('\n');
      if (!nextLines.includes('catch')) {
        findings.push({ 
          line: index + 1, 
          msg: 'Bloque try sin catch detectado. Siempre maneja las excepciones apropiadamente.',
          severity: 'Media',
          category: 'Manejo de Errores'
        });
      }
    }
    
    // Regla 12: Uso de with (Mala práctica)
    if (/\bwith\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de "with" detectado. Está deprecado y causa confusión en el scope.',
        severity: 'Alta',
        category: 'Obsolescencia'
      });
    }
    
    // Regla 13: TODO/FIXME sin resolver
    if (/(\/\/|\/\*|\*)\s*(TODO|FIXME|HACK|XXX)/i.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comentario TODO/FIXME encontrado. Revisa deuda técnica pendiente.',
        severity: 'Baja',
        category: 'Deuda Técnica'
      });
    }
    
    // Regla 14: Líneas muy largas
    if (line.length > 120) {
      findings.push({ 
        line: index + 1, 
        msg: `Línea demasiado larga (${line.length} caracteres). Mantén líneas menores a 120 caracteres para legibilidad.`,
        severity: 'Baja',
        category: 'Estilo'
      });
    }
    
    // Regla 15: Múltiples declaraciones en una línea
    if (line.split(';').filter(s => s.trim().length > 0).length > 1) {
      findings.push({ 
        line: index + 1, 
        msg: 'Múltiples declaraciones en una línea. Separa en líneas individuales para mejor legibilidad.',
        severity: 'Baja',
        category: 'Estilo'
      });
    }
    
    // Regla 16: Funciones anónimas sin nombre
    if (/function\s*\(/.test(line) && !line.includes('=>')) {
      findings.push({ 
        line: index + 1, 
        msg: 'Función anónima detectada. Considera usar arrow functions o nombrar la función para debugging.',
        severity: 'Baja',
        category: 'Buenas Prácticas'
      });
    }
    
    // Regla 17: Uso de setTimeout/setInterval con string
    if (/(setTimeout|setInterval)\s*\(\s*['"]/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'setTimeout/setInterval con string detectado. Usa funciones en lugar de strings para evitar eval implícito.',
        severity: 'Alta',
        category: 'Seguridad'
      });
    }
    
    // Regla 18: Falta de punto y coma
    if (trimmedLine.length > 0 && 
        !trimmedLine.endsWith(';') && 
        !trimmedLine.endsWith('{') && 
        !trimmedLine.endsWith('}') &&
        !trimmedLine.endsWith(',') &&
        !trimmedLine.startsWith('//') &&
        !trimmedLine.startsWith('/*') &&
        !/^(if|else|for|while|function|class|switch|case|default)/i.test(trimmedLine)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Posible falta de punto y coma. Aunque ASI existe, es mejor práctica usar punto y coma explícito.',
        severity: 'Baja',
        category: 'Estilo'
      });
    }
    
    // Regla 19: Uso de dangerouslySetInnerHTML en React
    if (/dangerouslySetInnerHTML/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'dangerouslySetInnerHTML detectado. Alto riesgo de XSS. Sanitiza el HTML o usa alternativas seguras.',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 20: Uso de target="_blank" sin rel="noopener noreferrer"
    if (/target\s*=\s*["']_blank["']/.test(line) && !/rel\s*=/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'target="_blank" sin rel="noopener noreferrer" detectado. Vulnerabilidad de seguridad (tabnabbing).',
        severity: 'Alta',
        category: 'Seguridad'
      });
    }
    
    // Regla 21: Declaración de funciones dentro de loops
    if (/(for|while)\s*\([^)]*\)\s*\{/.test(line)) {
      const nextLines = lines.slice(index, Math.min(index + 5, lines.length)).join('\n');
      if (/function\s+\w+/.test(nextLines)) {
        findings.push({ 
          line: index + 1, 
          msg: 'Declaración de función dentro de un loop. Causa problemas de rendimiento y scope.',
          severity: 'Media',
          category: 'Rendimiento'
        });
      }
    }
    
    // Regla 22: Uso de prompt/confirm
    if (/(prompt|confirm)\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de prompt()/confirm() detectado. Son modales nativos bloqueantes. Usa componentes personalizados.',
        severity: 'Media',
        category: 'UX'
      });
    }
    
    // Regla 23: Uso de "new Array()" o "new Object()"
    if (/new\s+(Array|Object)\s*\(/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de "new Array()" o "new Object()" detectado. Usa literales [] y {} por simplicidad.',
        severity: 'Baja',
        category: 'Buenas Prácticas'
      });
    }
    
    // Regla 24: Comparación con NaN
    if (/[=!]==?\s*NaN|NaN\s*[=!]==?/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comparación directa con NaN detectada. Usa isNaN() o Number.isNaN() en su lugar.',
        severity: 'Alta',
        category: 'Bugs'
      });
    }
    
    // Regla 25: SQL injection patterns
    if (/(SELECT|INSERT|UPDATE|DELETE).*\+.*['"]/i.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Posible SQL injection detectado. Nunca concatenes queries SQL. Usa prepared statements.',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 26: Modificación de prototipos nativos
    if (/(Array|Object|String|Number|Boolean|Function)\.prototype\.\w+\s*=/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Modificación de prototipo nativo detectada. Puede causar conflictos con librerías y futuras versiones de JS.',
        severity: 'Alta',
        category: 'Buenas Prácticas'
      });
    }
    
    // Regla 27: Uso de for...in sin hasOwnProperty
    if (/for\s*\(\s*\w+\s+in\s+/.test(line)) {
      const nextLines = lines.slice(index, Math.min(index + 3, lines.length)).join('\n');
      if (!nextLines.includes('hasOwnProperty')) {
        findings.push({ 
          line: index + 1, 
          msg: 'for...in sin hasOwnProperty detectado. Puede iterar propiedades heredadas del prototipo.',
          severity: 'Media',
          category: 'Bugs'
        });
      }
    }
    
    // Regla 28: Uso de "this" en funciones arrow dentro de clases
    if (/=>\s*{/.test(line) && lines.slice(Math.max(0, index - 5), index).some(l => /class\s+\w+/.test(l))) {
      if (/this\./.test(line)) {
        findings.push({ 
          line: index + 1, 
          msg: 'Posible confusión con "this" en arrow function dentro de clase. Verifica el contexto.',
          severity: 'Baja',
          category: 'Calidad'
        });
      }
    }
    
    // Regla 29: Uso de Math.random() para criptografía
    if (/Math\.random\(\)/.test(line) && /(token|key|password|secret|crypto)/i.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Math.random() no es seguro para criptografía. Usa crypto.getRandomValues() o crypto.randomBytes().',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 30: Catch vacío que ignora errores
    if (trimmedLine.startsWith('catch') && trimmedLine.includes('{')) {
      const nextLines = lines.slice(index, Math.min(index + 3, lines.length)).join('\n');
      if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(nextLines)) {
        findings.push({ 
          line: index + 1, 
          msg: 'Bloque catch vacío detectado. Los errores se están ignorando silenciosamente.',
          severity: 'Media',
          category: 'Manejo de Errores'
        });
      }
    }
    
    // Regla 31: Uso de ===/!== con objetos o arrays (comparación por referencia)
    if (/(===|!==)\s*(\[|\{)/.test(line) || /(\[|\{)\s*(===|!==)/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comparación de objetos/arrays por referencia. Considera usar comparación profunda (deep equality).',
        severity: 'Media',
        category: 'Bugs'
      });
    }
    
    // Regla 32: Uso de parseInt sin radix
    if (/parseInt\s*\([^,)]+\)/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'parseInt sin radix detectado. Siempre especifica el radix (10) para evitar resultados inesperados.',
        severity: 'Media',
        category: 'Bugs'
      });
    }
    
    // Regla 33: Variables globales implícitas
    if (/^\s*[a-zA-Z_$][\w$]*\s*=/.test(line) && !/(var|let|const|function|class)\s+/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Posible variable global implícita. Siempre declara variables con let, const o var.',
        severity: 'Alta',
        category: 'Bugs'
      });
    }
    
    // Regla 34: Uso de Array constructors con un solo número
    if (/new\s+Array\s*\(\s*\d+\s*\)/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Array constructor con un número puede causar confusión. Usa Array.fill() o literales.',
        severity: 'Baja',
        category: 'Calidad'
      });
    }
    
    // Regla 35: Uso de delete para arrays
    if (/delete\s+\w+\[\d+\]/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Uso de delete en array detectado. Deja "holes" en el array. Usa splice() en su lugar.',
        severity: 'Media',
        category: 'Bugs'
      });
    }
    
    // Regla 36: async sin await
    if (/async\s+function/.test(line) || /async\s*\(/.test(line)) {
      const functionBody = lines.slice(index, Math.min(index + 20, lines.length)).join('\n');
      if (!functionBody.includes('await') && !functionBody.includes('return Promise')) {
        findings.push({ 
          line: index + 1, 
          msg: 'Función async sin await detectada. Elimina async si no es necesario.',
          severity: 'Baja',
          category: 'Calidad'
        });
      }
    }
    
    // Regla 37: Promise sin catch
    if (/\.then\s*\(/.test(line) && !line.includes('.catch')) {
      const nextLines = lines.slice(index, Math.min(index + 5, lines.length)).join('\n');
      if (!nextLines.includes('.catch') && !nextLines.includes('try')) {
        findings.push({ 
          line: index + 1, 
          msg: 'Promise sin .catch() detectado. Siempre maneja rechazos de promesas.',
          severity: 'Media',
          category: 'Manejo de Errores'
        });
      }
    }
    
    // Regla 38: Uso de "arguments" en arrow functions
    if (/=>\s*{/.test(line)) {
      const nextLines = lines.slice(index, Math.min(index + 5, lines.length)).join('\n');
      if (/\barguments\b/.test(nextLines)) {
        findings.push({ 
          line: index + 1, 
          msg: 'Uso de "arguments" en arrow function. Las arrow functions no tienen arguments, usa rest parameters.',
          severity: 'Alta',
          category: 'Bugs'
        });
      }
    }
    
    // Regla 39: Comparación con true/false
    if (/===\s*(true|false)|(true|false)\s*===/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Comparación explícita con true/false es redundante. Usa la expresión booleana directamente.',
        severity: 'Baja',
        category: 'Estilo'
      });
    }
    
    // Regla 40: Uso de location.href sin validación
    if (/location\.href\s*=\s*['"]?(?!https?:\/\/)/.test(line) && /\+/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Asignación de location.href sin validación. Posible open redirect vulnerability.',
        severity: 'Alta',
        category: 'Seguridad'
      });
    }
    
    // Regla 41: Uso de localStorage para datos sensibles
    if (/localStorage\.(setItem|getItem)/.test(line) && /(password|token|key|secret)/i.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'localStorage para datos sensibles detectado. Es vulnerable a XSS. Usa httpOnly cookies.',
        severity: 'Crítica',
        category: 'Seguridad'
      });
    }
    
    // Regla 42: Funciones con demasiados parámetros
    if (/function\s+\w+\s*\([^)]{60,}\)/.test(line)) {
      const params = line.match(/\(([^)]+)\)/)?.[1].split(',').length || 0;
      if (params > 5) {
        findings.push({ 
          line: index + 1, 
          msg: `Función con ${params} parámetros detectada. Considera usar un objeto de opciones.`,
          severity: 'Media',
          category: 'Complejidad'
        });
      }
    }
    
    // Regla 43: Números mágicos
    if (/\b\d{4,}\b/.test(line) && !/(const|let|var)\s+\w+\s*=/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Número mágico detectado. Define constantes con nombres descriptivos.',
        severity: 'Baja',
        category: 'Mantenibilidad'
      });
    }
    
    // Regla 44: Uso de "any" en TypeScript
    if (/:\s*any\b/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'Tipo "any" detectado. Elimina los beneficios de TypeScript. Define tipos específicos.',
        severity: 'Media',
        category: 'TypeScript'
      });
    }
    
    // Regla 45: console.error sin contexto
    if (/console\.error\s*\(\s*['"][^'"]*['"]\s*\)/.test(line)) {
      findings.push({ 
        line: index + 1, 
        msg: 'console.error sin objeto de error. Incluye el stack trace para debugging.',
        severity: 'Baja',
        category: 'Debugging'
      });
    }
  });

  // Análisis global del código
  // Regla 46: Profundidad de anidamiento excesiva
  const indentationLevels = lines.map(line => {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  });
  const maxIndent = Math.max(...indentationLevels);
  if (maxIndent > 24) { // Más de 6 niveles (asumiendo 4 espacios por nivel)
    findings.push({ 
      line: 1, 
      msg: `Anidamiento excesivo detectado (${Math.floor(maxIndent/4)} niveles). Refactoriza para reducir complejidad.`,
      severity: 'Media',
      category: 'Complejidad'
    });
  }
  
  // Regla 47: Código comentado
  const commentedCodeLines = lines.filter(line => {
    const trimmed = line.trim();
    return (trimmed.startsWith('//') || trimmed.startsWith('/*')) && 
           /[{};()=]/.test(trimmed);
  }).length;
  if (commentedCodeLines > 3) {
    findings.push({ 
      line: 1, 
      msg: `${commentedCodeLines} líneas de código comentado detectadas. Elimina código muerto o usa control de versiones.`,
      severity: 'Baja',
      category: 'Código Muerto'
    });
  }
  
  // Regla 48: Archivo muy grande
  const totalLines = lines.filter(l => l.trim().length > 0).length;
  if (totalLines > 300) {
    findings.push({ 
      line: 1, 
      msg: `Archivo muy grande (${totalLines} líneas). Considera dividirlo en módulos más pequeños.`,
      severity: 'Media',
      category: 'Mantenibilidad'
    });
  }
  
  // Regla 49: Falta de "use strict"
  if (!code.includes('"use strict"') && !code.includes("'use strict'")) {
    findings.push({ 
      line: 1, 
      msg: 'Falta "use strict". Aunque ES6+ lo incluye implícitamente en módulos, es buena práctica explicitarlo.',
      severity: 'Baja',
      category: 'Buenas Prácticas'
    });
  }
  
  // Regla 50: Muchas variables globales
  const globalVars = code.match(/^\s*var\s+\w+/gm)?.length || 0;
  if (globalVars > 5) {
    findings.push({ 
      line: 1, 
      msg: `${globalVars} variables var detectadas. Encapsula en módulos o usa let/const con scope apropiado.`,
      severity: 'Media',
      category: 'Arquitectura'
    });
  }
  
  // Regla 51: Funciones muy largas
  let currentFunction = null;
  let functionStartLine = 0;
  lines.forEach((line, index) => {
    if (/function\s+\w+/.test(line)) {
      currentFunction = line;
      functionStartLine = index;
    }
    if (currentFunction && line.trim() === '}') {
      const functionLength = index - functionStartLine;
      if (functionLength > 50) {
        findings.push({ 
          line: functionStartLine + 1, 
          msg: `Función muy larga (${functionLength} líneas). Divide en funciones más pequeñas y cohesivas.`,
          severity: 'Media',
          category: 'Complejidad'
        });
      }
      currentFunction = null;
    }
  });
  
  // Regla 52: Falta de validación de entrada
  if (/document\.(getElementById|querySelector)/.test(code)) {
    if (!code.includes('if') && !code.includes('?')) {
      findings.push({ 
        line: 1, 
        msg: 'Acceso al DOM sin validación. Valida que los elementos existan antes de usarlos.',
        severity: 'Media',
        category: 'Robustez'
      });
    }
  }
  
  // Regla 53: Callback hell detectado
  const callbackDepth = (code.match(/function\s*\([^)]*\)\s*{/g) || []).length;
  if (callbackDepth > 4) {
    findings.push({ 
      line: 1, 
      msg: `Posible callback hell detectado (${callbackDepth} callbacks anidados). Usa Promises o async/await.`,
      severity: 'Alta',
      category: 'Legibilidad'
    });
  }
  
  // Regla 54: Demasiados imports
  const importCount = (code.match(/^import\s+/gm) || []).length;
  if (importCount > 15) {
    findings.push({ 
      line: 1, 
      msg: `Demasiados imports (${importCount}). Considera agrupar imports relacionados o refactorizar.`,
      severity: 'Baja',
      category: 'Arquitectura'
    });
  }
  
  // Regla 55: Uso excesivo de any type (TypeScript)
  const anyCount = (code.match(/:\s*any\b/g) || []).length;
  if (anyCount > 5) {
    findings.push({ 
      line: 1, 
      msg: `Uso excesivo de tipo "any" (${anyCount} ocurrencias). TypeScript pierde su propósito.`,
      severity: 'Alta',
      category: 'TypeScript'
    });
  }

  return findings;
};
