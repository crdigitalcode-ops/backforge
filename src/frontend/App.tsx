import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-6">
        BACKFORGE PRO Dashboard
      </h1>
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-slate-700">
        <p className="text-slate-300 text-center mb-4">
          O Front-end está rodando com sucesso!
        </p>
        <div className="bg-slate-900 text-slate-400 p-4 rounded-lg text-sm text-center font-mono">
          API Status: {message || 'Conectando ao backend...'}
        </div>
      </div>
    </div>
  );
}

export default App;
